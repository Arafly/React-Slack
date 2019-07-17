import React, { Component } from "react";
import AnyoneOnlineList from "../components/AnyoneOnlineList";

class AnyoneOnline extends Component {
  // state = {  }
  renderUsers() {
    return (
      <ul>
        {" "}
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUsers.id) {
            return (
              <AnyoneOnlineList key={index} presenceState="online">
                {" "}
                {user.name}(You){" "}
              </AnyoneOnlineList>
            );
          }
          return (
            <AnyoneOnlineList key={index} presenceState={user.presence.state}>
              {" "}
              {user.name}{" "}
            </AnyoneOnlineList>
          );
        })}{" "}
      </ul>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers()
    }else {
      return <p>Loading...</p> 
    }
    
  }
}

export default AnyoneOnline;
