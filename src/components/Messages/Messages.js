import React from "react";
import "./Messages.css";

const Messages = ({ messages, currentMember }) => {
  const renderMessage = (message, idx) => {
    const { member, data: text, username, timestamp } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "messagesMessage currentMember"
      : "messagesMessage";

   
    const dynamicText = username || "Unknown User";
    const imageUrl = `https://robohash.org/${dynamicText}.png?size=40x40&set=set5`;

    // Pretvori timestamp u Date objekt
    const date = new Date(timestamp * 1000); // Množimo sa 1000 jer Date očekuje timestamp u milisekundama

    // Formatiraj vrijeme u lokalnom formatu
    const formattedTime = date.toLocaleTimeString();

    return (
      <li className={className} key={idx}>
        <span className="avatar">
          <img src={imageUrl} alt="Avatar" />
        </span>
        <div className="messageContent">
          <div className="username">{dynamicText}</div>
          <div className="text">{text}</div>
          <div className="time">{formattedTime}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="messagesList">
      {messages.map((m, idx) => renderMessage(m, idx))}
    </ul>
  );
};

export default Messages;
