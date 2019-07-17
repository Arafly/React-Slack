import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import  Messages from "../components/Messages"
import  MessageForm from "../components/MessageForm"
import IsTyping from "../components/TypingIndicator"
import AnyoneOnline from "../components/AnyoneOnline"

class Screen extends Component {
  state = {
    currentUsers: {},
    currentRoom: {},
    messages: [],
    typingUsers: []
  };

  // Most interactions happen on currentUsers
  sendMessage = (text)=> {
    this.state.currentUsers.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
  }

  showTyping() {
    this.state.currentUsers
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.log('error', error))
  }

  componentDidMount () {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:4307acfe-a2d0-4755-9738-6ae17c53d375",
      userId: this.props.currentUser,
      tokenProvider: new Chatkit.TokenProvider({
        url: "http://localhost:3301/auth"
      })
    });

    chatManager
      .connect()
      .then(currentUsers => {
        this.setState({
          currentUsers
        })
        return currentUsers.subscribeToRoom ({
          roomId: "21630538",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message ]
              })
            },
            onUserStartedTyping: user => {
              this.setState({
                typingUsers: [...this.state.typingUsers, user.name]
              })
            },
            onUserStoppedTyping: user => {
              this.setState({
                typingUsers: this.state.typingUsers.filter(
                  username =>  {
                    username  !== user.name
                  }
                ),
              })
            },
            onPresenceChange: () => this.forceUpdate() ,
          }
        })
      })
      .then(currentRoom => {
        this.setState ({
          currentRoom
        })
      })
      .catch(error => console.log("error", error));
  }

  render() {
    const screenStyle = {
      container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      },
      chatContainer: {
        display: "flex",
        flex: 1
      },
      whosOnlineSection: {
        width: "300px",
        flex: "none",
        padding: 20,
        backgroundColor: "#696969",
        color: "white"
      },
      chatListSection: {
        padding: 20,
        width: "85%",
        display: "flex",
        flexDirection: "column"
      }
    };

    return (
      <div style={ screenStyle.container}>
         <div style={screenStyle.chatContainer}>
          <aside style={screenStyle.whosOnlineSection}>
            <h3>Welcome {this.props.currentUser}</h3>
            {/* Manage the state of your users  in currentRoom.users.
                  As users connect/disconnect, this property is dynamically updated. 
                  currentRoom.users always refelect the current state of the chat app.
                  When users come online/offline (onPresenceChange), or new users join (onUserAdded) 
                  all we have to do is call forceUpdate which tells React to evaluate currentRoom.users and update the UI.
            */}
            <AnyoneOnline 
              currentUsers = {this.state.currentUsers}
              users = {this.state.currentRoom.users}
            />
          </aside>
          <section style={screenStyle.chatListSection}>
            <Messages
            messages={this.state.messages}
              style={screenStyle.chatListSection}
            />
            <IsTyping typingUsers = {this.state.typingUsers}  />
            <MessageForm onSubmit = {this.sendMessage} />
          </section>

        </div>
        
      </div>
    );
  }
}

export default Screen;
