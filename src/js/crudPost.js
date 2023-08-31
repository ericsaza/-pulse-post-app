// Imports
import { addDoc, collection, getDocs, getDoc, deleteDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { db } from "../services/firebase.js";
import { showMessage } from "./showToastifyMessage.js";

// Variables globales
const createPostForm = document.querySelector("#createPost-form");
const postList = document.querySelector('.posts');
const titlePostInput = document.querySelector('#title-post');
const contentPostInput = document.querySelector('#content-post');
const deletePostButton = document.querySelector('#delete-button');
const editPostButton = document.querySelector('#edit-button');
const editPostForm = document.querySelector('#editPost-form');
const editTitleInput = document.querySelector('#editTitle-post');
const editContentInput = document.querySelector('#editContent-post');

// Funciones
const deletePost = async (id) => { await deleteDoc(doc(db, "posts", id)); }
/**
 * Función para convertir la cadena de fecha en un objeto Date
 * @param {string} dateString - Cadena de fecha en formato "YYYY-MM-DD HH:mm:ss"
 * @returns {Date} Objeto Date creado a partir de la cadena
 */
function parseDate(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minutes, seconds] = timePart.split(':');
    return new Date(year, month - 1, day, hour, minutes, seconds);
}
function getFormattedDate() {
    // Conseguiremos la fecha de hoy
    var fechaActual = new Date();
    var day = fechaActual.getDate();
    var month = fechaActual.getMonth() + 1; // Sumar 1 porque los meses en JavaScript van de 0 a 11
    var year = fechaActual.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    } if (day < 10) {
        day = '0' + day;
    }
    return `${day}-${month}-${year}`;
}
function getFormattedTime() {
    // Conseguiremos la fecha de hoy
    var fechaActual = new Date();
    var seconds = fechaActual.getSeconds();
    var minutes = fechaActual.getMinutes();
    var hours = fechaActual.getHours();

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    return `${hours}:${minutes}:${seconds}`;
}

// CREATE
createPostForm.addEventListener("submit", async (e) => {

    // Evitaremos que la página recargue
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    // Conseguiremos la fecha de hoy
    var fechaActual = new Date();
    var seconds = fechaActual.getSeconds();
    var minutes = fechaActual.getMinutes();
    var hours = fechaActual.getHours();
    var day = fechaActual.getDate();
    var month = fechaActual.getMonth() + 1; // Sumar 1 porque los meses en JavaScript van de 0 a 11
    var year = fechaActual.getFullYear();

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    } if (day < 10) {
        day = '0' + day;
    }

    // Y aqui tenndremos la fecha y la hora formateada
    var formattedDate = `${day}-${month}-${year}`;
    var formattedTime = `${hours}:${minutes}:${seconds}`;

    const titlePost = createPostForm['title-post'].value;
    const contentPost = createPostForm['content-post'].value;

    try {
        const docPost = await addDoc(collection(db, "posts"), {
            title: titlePost,
            content: contentPost,
            date: formattedDate,
            time: formattedTime,
            photoURL: user.photoURL,
            uid: user.uid
        });
        showMessage("Publicado", true);

        // Una vez iniciado sesión cerraremos el Modal
        const createPostModal = document.querySelector('#createPostModal');
        const modal = bootstrap.Modal.getInstance(createPostModal);
        modal.hide();

    } catch (e) {
        console.error(e);
    }

    postList.innerHTML = "";

    // Creamos una instancia de la colección
    const querySnapshot = await getDocs(collection(db, 'posts'));

    titlePostInput.value = "";
    contentPostInput.value = "";
    setUpPosts(querySnapshot.docs);
})

// READ
/**
 * Función para ver las publicaciones
 * @param {*} data 
 */
export const setUpPosts = (data) => {
    if (data.length) {
        postList.innerHTML = "";

        const auth = getAuth();
        const user = auth.currentUser;

        // Ordenar los datos por fecha en orden descendente
        data.sort((a, b) => parseDate(b.data().date + " " + b.data().time) - parseDate(a.data().date + " " + a.data().time));

        // console.log(data);
        // Recorremos los datos
        data.forEach(doc => {

            // Guardamos los datos en una constante
            const post = doc.data();

            // console.log(post)
            // Obtenemos el ID
            post.id = doc.id;

            let options = "";
            if (user.uid == post.uid) {
                options = `
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#openOptionsModal" id="optionsButton" data-id="${post.id}">
                    <svg aria-label="Más opciones" class="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </button>`;
            }

            const li = `
            <l1 class="list-group-item list-group-item-action list-group-item-dark" id="post"> ` + options + `
                <h5>${post.title}</h5>
                <p>${post.content}</p>
                <div class="dateAndUser">
                    <img src="${post.photoURL}" class="img-fluid rounded-circle" alt="image" id="postUserPhoto"/>
                    <p class="datePost">${post.date}</p>
                </div>
            </li>`;
            postList.innerHTML += li;
            const optionButtons = document.querySelectorAll('#optionsButton');
            optionButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    // console.log(button.getAttribute('data-id'));
                    deletePostButton.setAttribute('data-id', button.getAttribute('data-id'));
                    editPostButton.setAttribute('data-id', button.getAttribute('data-id'));
                })
            });
        });
    } else {
        postList.innerHTML = '<h1>No hay publicaciones.</h1>';
    }
}

// UPDATE
editPostButton.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const postSnap = await getDoc(doc(db, "posts", editPostButton.getAttribute('data-id')));
    // console.log(postSnap.data().title, postSnap.data().content);
    editTitleInput.value = postSnap.data().title;
    editContentInput.value = postSnap.data().content;
})
editPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    const editPostForm = document.querySelector('#editPost-form');

    const editTitlePostInput = editPostForm['editTitle-post'].value;
    const editContentPostInput = editPostForm['editContent-post'].value;

    // Y aqui tenndremos la fecha y la hora formateada
    var formattedDate = getFormattedDate();
    var formattedTime = getFormattedTime();

    try {
        await setDoc(doc(db, "posts", editPostButton.getAttribute('data-id')), {
            title: editTitlePostInput,
            content: editContentPostInput,
            date: formattedDate,
            time: formattedTime,
            photoURL: user.photoURL,
            uid: user.uid
        });
        showMessage("Has editado una publicación", true);

        // Una vez Borrado el documento
        const editModal = document.querySelector('#editPostModal');
        const modal = bootstrap.Modal.getInstance(editModal);
        modal.hide();

        // Creamos una instancia de la colección
        const querySnapshot = await getDocs(collection(db, 'posts'));
        // console.log(querySnapshot.docs);

        // editTitleInput.value = "";
        // editContentInput.value = "";
        setUpPosts(querySnapshot.docs);
    } catch (error) {
        console.log(error);
    }
})
// DELETE
const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();

    // Obtenemos el ID del post
    const postID = deletePostButton.getAttribute('data-id');
    await deletePost(postID);

    try {
        showMessage("Has eliminado una publicación", false);

        // Una vez Borrado el documento
        const optionModal = document.querySelector('#openOptionsModal');
        const modal = bootstrap.Modal.getInstance(optionModal);
        modal.hide();


        // Creamos una instancia de la colección
        const querySnapshot = await getDocs(collection(db, 'posts'));
        // console.log(querySnapshot.docs);

        titlePostInput.value = "";
        contentPostInput.value = "";
        setUpPosts(querySnapshot.docs);
    } catch (error) {
        console.log(error);
    }
})