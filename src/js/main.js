// Imports
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { auth, db } from "../services/firebase.js";
import { loginCheck } from './loginCheck.js';
import { setUpPosts } from './crudPost.js';
import './signUpForm.js';
import './signInForm.js';
import './loginWithSocialNetworks.js';
import './logout.js';
import './loginCheck.js';

const postList = document.querySelector('.posts');

/**
 * Función de firebase para saber si el usuario estará autenificado o no
 */
onAuthStateChanged(auth, async (user) => {

    // Comprobará el estado y mostrara el nav dependiendo del estado
    if (user) {
        postList.innerHTML = "";

        // Creamos una instancia de la colección
        const querySnapshot = await getDocs(collection(db, 'posts'));
        // console.log(querySnapshot.docs);

        setUpPosts(querySnapshot.docs);
    } else {
        setUpPosts([]);
        postList.innerHTML = "<h1>Inicia sesión para ver las publicaciones</h1>"
    }
    loginCheck(user);
})