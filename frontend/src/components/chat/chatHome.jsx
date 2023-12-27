import "../../App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat.jsx";
import Email from "../Email/Email.jsx";
import NavbarAgent from "../../pages/NavbarAgent.jsx";
const socket = io.connect("https://localhost:5000");

function chatHome() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div className="App">

            {!showChat ? (
                    <div className="joinChatContainer">
                        <h3>Join chat</h3>
                        <input
                            type="text"
                            placeholder="User Name"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Room Name"
                            onChange={(event) => {
                                setRoom(event.target.value);
                            }}
                        />
                        <button onClick={joinRoom}>Join A Room</button>
                    </div>
                )
                :(
                    <Chat socket={socket} username={username} room={room}/>
                )}
        </div>
    );

//     return (
//         <div className="App">
//             <Email />
//         </div>
//     );
// }
}

export default chatHome;
