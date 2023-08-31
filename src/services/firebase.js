// TODO: Para importar librerias de Firebase, aqui tienes el enlace: https://firebase.google.com/docs/web/setup#available-libraries
// Importaremos las funciones que necesitemos de los SDK que necesita
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

// ? Librerias de Firebase
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8eU-ZC4wEESCzqE_i4sixzWUMWP9C8w8",
  authDomain: "pulse-post.firebaseapp.com",
  projectId: "pulse-post",
  storageBucket: "pulse-post.appspot.com",
  messagingSenderId: "1051489432230",
  appId: "1:1051489432230:web:ae4e16e4d12fcd5a3eba67"
};

// Iniciar Firebase
export const app = initializeApp(firebaseConfig); // Al una variable con "export" se podrá utilizar en otros archivos
export const auth = getAuth(app); // Inicializa la autenticación de Firebase y obtiene una referencia al servicio
export const db = getFirestore(app); // Inicializa la base de datos de Firebase y obtiene una referencia al servicio