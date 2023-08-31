// Imports
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { auth } from "../services/firebase.js";
import { showMessage } from "./showToastifyMessage.js";


const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", async (e) => {

    // Evitaremos que la página recargue
    e.preventDefault();

    const email = signInForm['login-email'].value;
    const password = signInForm['login-password'].value;
    // console.log(email,password)



    try {
        /**
        * Función de firebase para iniciar sesión en firebase
        */
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        // console.log(userCredentials)

        showMessage("Bienvenido, " + userCredentials.user.email, true);

        // Una vez iniciado sesión cerraremos el Modal
        const signInModal = document.querySelector('#signInModal');
        const modal = bootstrap.Modal.getInstance(signInModal);
        modal.hide();
    } catch (error) {
        // console.log(error)

        // Control de errores de inicio de sesión
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            showMessage("Inició de sesión incorrecto. Vuelve a intentarlo", false);
        } else if (error.code) {
            showMessage("Algo anda mal.", false);
        }
    }

})