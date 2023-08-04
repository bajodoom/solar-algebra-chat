import React from "react";

const Messages = ({ messages, currentMember }) => {
  const renderMessage = (message, idx) => {
    const { member, data: text, username, timestamp } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    // Provjera postoji li korisničko ime, ako ne, prikazujemo "Unknown User"
    const dynamicText = username || "Unknown User";
    const imageUrl = `https://robohash.org/${dynamicText}.png?size=40x40&set=set5`;

    // Pretvori timestamp u Date objekt
    const date = new Date(timestamp * 1000); // Množimo sa 1000 jer Date očekuje timestamp u milisekundama

    // Formatiraj vrijeme u lokaliziranom formatu
    const formattedTime = date.toLocaleTimeString();

    return (
      <li className={className} key={idx}>
        <span className="avatar">
          <img src={imageUrl} alt="Avatar" />
        </span>
        <div className="Message-content">
          <div className="username">{dynamicText}</div>
          <div className="text">{text}</div>
          <div className="time">{formattedTime}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="Messages-list">
      {messages.map((m, idx) => renderMessage(m, idx))}
    </ul>
  );
};

export default Messages;

/* import React from "react";

const Messages = ({ messages, currentMember }) => {
  const renderMessage = (message, idx) => {
    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    const dynamicText = member.clientData.username;
    const imageUrl = `https://robohash.org/${dynamicText}.png?size=40x40&set=set4 `;

    return (
      <li className={className} key={idx}>
        <span className="avatar">
          <img src={imageUrl} alt="Avatar" />
        </span>
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="Messages-list">
      {messages.map((m, idx) => renderMessage(m, idx))}
    </ul>
  );
};

export default Messages;
 */
