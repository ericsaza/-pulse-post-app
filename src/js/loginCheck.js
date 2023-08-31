// Imports

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const userImage = document.querySelector(".user-image");

/**
 * Función que al recibir un usuario cambiará el nav de arriba 
 *  dependiendo del estado.
 * @param {*} user Recibirá un usuario 
 */
export const loginCheck = (user) => {
    if (user) {
        loggedInLinks.forEach(link => {
            link.style.display = "block";
        });
        loggedOutLinks.forEach(link => {
            link.style.display = "none";
        });
        try {
            if(user.photoURL) {
                userImage.src = user.photoURL;
            }   else {
                userImage.src = "https://d1bvpoagx8hqbg.cloudfront.net/259/4ea4217efbbf179e02269b065d23a60e.jpg";
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        loggedInLinks.forEach(link => {
            link.style.display = "none";
        });
        loggedOutLinks.forEach(link => {
            link.style.display = "block";
        });
        userImage.src = "https://d1bvpoagx8hqbg.cloudfront.net/259/4ea4217efbbf179e02269b065d23a60e.jpg";
    }
}