// Imports
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { auth } from "../services/firebase.js";
import { showMessage } from "./showToastifyMessage.js";

const signUpForm = document.querySelector("#signup-form");

/**
 * Eento para crear un usuario con firebase.
 * @param submit será el evento que buscará en este caso el submit
 * @param event el evento que ejecutara, en este caso serña una función asincrona de flecha
 */
signUpForm.addEventListener("submit", async (e) => {

    // Evitaremos que la página recargue
    e.preventDefault();

    const email = signUpForm['signup-email'].value

    // Mínimo de carácteres para una contraseña en firebase = 8
    const password = signUpForm['signup-password'].value
    // console.log(email,password)

    let userCreated = false;

    try {

        // Añadirá el usuario a firebase
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(userCredentials);

        // Mostraremos una alerta con un mensaje de bienvenida
        showMessage("Bienvenido, " + userCredentials.user.email, true);

        // Una vez creado el usuario cerraremos el Modal
        const signUpModal = document.querySelector('#signUpModal');
        const modal = bootstrap.Modal.getInstance(signUpModal);
        modal.hide();

    } catch (error) {
        // console.log(error)

        // Control de errores de registro
        if (error.code === 'auth/email-already-in-use') {
            showMessage("El usuario " + email + " ya existe.", false);
        } else if (error.code === 'auth/invalid-email') {
            showMessage("Correo inválido.", false);
        } else if (error.code === 'auth/weak-password') {
            showMessage("Contraseña corta. (Mínimo 6 carácteres)", false);
        } else if (error.code) {
            showMessage("Algo anda mal.", false);
        }

    }
})