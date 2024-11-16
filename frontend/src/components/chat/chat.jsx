import React, {useEffect, useState} from "react";
import BasicScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";
//import crypto from "crypto";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        receiver: room,
        sender: username,
        message: currentMessage,
        date: Date.now(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on('old_messages', (oldMessages) => {
      setMessageList(oldMessages);
    });

    const receiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", receiveMessage);

    // Cleanup function
    return () => {
      socket.off("receive_message", receiveMessage);
      socket.off("old_messages");
    };
  }, []);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <BasicScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (
                            <div key={index}>
                                <div
                                    className="message"
                                    id={username === messageContent.sender ? "you" : "other"}
                                >
                                    <div>
                                        <div className="message-content">
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{new Date(messageContent.date).toLocaleString()}</p>
                                            <p id="author">{messageContent.sender}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </BasicScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Enter Message"
                    autoComplete="off"
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;
