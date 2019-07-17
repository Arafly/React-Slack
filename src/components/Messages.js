import React, { Component } from "react";

class Messages extends Component {
  // state = {};

  render() {
    const messagingStyle = {
      container: {
        overflowY: "scroll",
        flex: 1
      },
      ul: {
        listStyle: "none"
      },
      li: {
        marginTop: 13,
        marginBottom: 13
      },
      senderUsername: {
        fontWeight: "bold"
      },
      message: {
        fontSize: 15
      }
    };
    return (
      <div
        style={{
          ...this.props.style,
          ...messagingStyle.container
        }}
      >
        <ul style={messagingStyle.ul}>
          {" "}
          {this.props.messages.map((message, index) => (
            <li key={index} style={messagingStyle.li}>
              <div>
                <span style={messagingStyle.senderUsername}> {message.senderId} </span>{" "}
              </div>
              <p style={messagingStyle.message}> {message.text} </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Messages;
