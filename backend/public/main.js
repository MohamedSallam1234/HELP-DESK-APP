// const socket = io();
// const form = document.getElementById("message-form");
// const input = document.getElementById("message-input");
// const messages = document.getElementById("messages");
//
// const SocketIO = require('socket.io-client');
// const encrypt = require('socket.io-encrypt');
//
// const socket = SocketIO('http://localhost:3000');
// encrypt('secret')(socket);
//
// socket.on('connect', () => {
//     console.log('Connected');
//     socket.emit('message', { message: 'my secret message' });
// });
//
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit("chat message", input.value);
//         input.value = "";
//     }
// });
//
// socket.on("chat message", (encryptedMsg) => {
//     const decryptedBytes = CryptoJS.AES.decrypt(
//         encryptedMsg,
//         "secret passphrase"
//     );
//     const msg = decryptedBytes.toString(cryptoJS.enc.Utf8);
//     const item = document.createElement("li");
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });
