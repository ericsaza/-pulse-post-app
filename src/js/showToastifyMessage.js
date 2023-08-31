/**
 * Función para mostrar un mensaje dependiendo del tipo
 * @param {"Mensaje que mostrará la alerta"} message 
 * @param {"Definirá el color de la alerta"} type 
 */
export function showMessage(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type === true ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}