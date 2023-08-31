// Imports
import { showMessage } from "./showToastifyMessage.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { auth } from "../services/firebase.js";

const logout = document.querySelector("#logout");

/**
 * Al clickar el botón de "cerrar sesión" tendrá de cerrar sesión
 *  y mostrar un model avisando que cerraste sesión
 */
logout.addEventListener("click", async () => {
    await showMessage('Cerraste sesión', false);
    await signOut(auth);
})