// Imports
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { auth } from "../services/firebase.js";
import { showMessage } from "./showToastifyMessage.js";


// Login con Google
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", async () => {

    // Hacemos una instancia de la clase 'GoogleAuthProvider'
    const provider = new GoogleAuthProvider();

    try {
        // Abrirá una ventana para iniciar sesión con Google
        const userCredentials = await signInWithPopup(auth, provider);
        console.log(userCredentials);
        
        // Mostrará un mensaje de bienvenida con el nombre de la persona.
        showMessage("Bienvenido, " + userCredentials.user.displayName, true);

        // Una vez iniciado sesión cerraremos el Modal
        const signInModal = document.querySelector('#signInModal');
        const modal = bootstrap.Modal.getInstance(signInModal);
        modal.hide();
    } catch (error) {
        console.log(error);
    }
})

// Login con Github
const githubButton = document.querySelector("#githubLogin");

githubButton.addEventListener("click", async () => {

    // Hacemos una instancia de la clase 'GithubAuthProvider'
    const provider = new GithubAuthProvider();

    try {
        // Abrirá una ventana para iniciar sesión con Github
        const userCredentials = await signInWithPopup(auth, provider);
        console.log(userCredentials);
        
        // Mostrará un mensaje de bienvenida con el nombre de la persona.
        showMessage("Bienvenido, " + userCredentials.user.displayName, true);

        // Una vez iniciado sesión cerraremos el Modal
        const signInModal = document.querySelector('#signInModal');
        const modal = bootstrap.Modal.getInstance(signInModal);
        modal.hide();
    } catch (error) {
        console.log(error);
    }
})