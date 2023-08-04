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
      messages.push(data); 
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
