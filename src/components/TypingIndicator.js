import React, { Component } from "react";

class IsTyping extends Component {
  // state = {  }

  render() {
    if (this.props.typingUsers.length > 0) {
      return (
        <div>
          {" "}
          {`${this.props.typingUsers.slice(0, 2).join(" and ")}is typing`}{" "}
        </div>
      );
    }
    return <div />;
  }
}

export default IsTyping;
