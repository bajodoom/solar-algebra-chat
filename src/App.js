import React, { Component } from "react";
import "./App.css";
import Messages from "./components/Messages";
import Input from "./components/Input";
import Login from "./components/Login";

class App extends Component {
  state = {
    messages: [],
    member: {
      id: "", // Unique client ID will be set when the connection is established
      username: "",
    },
  };

  componentDidMount() {
    this.drone = new window.Scaledrone("BxonV9QZoeC5THZA");

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    const room = this.drone.subscribe("observable-is-room");
    room.on("data", (data, member) => {
      const messages = [...this.state.messages];
      messages.push(data); // Push the received message object to the messages array
      this.setState({ messages });
    });
  }

  setMemberUsername = (username) => {
    const member = { ...this.state.member, username };
    this.setState({ member });
  };

  onSendMessage = (text) => {
    const { id, username } = this.state.member;
    const message = {
      clientId: id,
      data: text,
      id: new Date().getTime().toString(),
      username: username,
      member: {
        id: id,
      },
      timestamp: Math.floor(new Date().getTime() / 1000),
    };

    this.drone.publish({
      room: "observable-is-room",
      message: message,
    });
  };

  render() {
    if (!this.state.member.username) {
      return <Login setMemberUsername={this.setMemberUsername} />;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h1>Solar Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;

/* import React, { Component } from "react";
import "./App.css";
import Messages from "./components/Messages";
import Input from "./components/Input";
// Function to generate a random name from a list of users
function randomName() {
  const users = [
    "Ivan",
    "Marko",
    "Petar",
    "Ana",
    "Iva",
    "Marija",
    "Marta",
    "Katarina",
    "Luka",
    "Filip",
    "Nikola",
    "Matej",
    "Dora",
    "Ema",
    "Sara",
    "Lucija",
    "Ante",
    "Tomislav",
    "Igor",
    "Josip",
    "Sanja",
    "Ivana",
    "Marina",
    "Nina",
    "Kristina",
    "Stjepan",
    "Toni",
    "Andrea",
    "Leon",
    "Emanuel",
    "Bruno",
    "Tin",
    "Helena",
    "Nikolina",
    "Anamarija",
    "Marica",
    "Ivona",
    "Tea",
    "Nikša",
    "Ivo",
    "Nikolina",
    "Klara",
    "Antonio",
    "Josipa",
    "Lara",
    "Mirko",
    "Dubravka",
    "Mia",
  ];
  const adjective = users[Math.floor(Math.random() * users.length)];
  const capitalized = adjective.charAt(0).toUpperCase() + adjective.slice(1);
  return capitalized;
}
// Function to generate a random color
function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}
class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };
  componentDidMount() {
    // Initialize the Scaledrone instance with the member data
    this.drone = new window.Scaledrone("BxonV9QZoeC5THZA", {
      data: this.state.member,
    });
    // Set up event handlers for Scaledrone events
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-is-room");
    room.on("data", (data, member) => {
      const messages = [...this.state.messages];
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }
  // Function to handle sending a message
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-is-room",
      message,
    });
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Solar Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}
export default App;
 */
