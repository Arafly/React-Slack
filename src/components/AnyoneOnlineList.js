import React, { Component } from "react";

class AnyoneOnlineList extends Component {
  state = {};
  render() {
    const onlineStyle = {
      li: {
        display: "flex",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2
      },
      list: {
        borderRadius: "50%",
        width: 11,
        height: 11,
        marginRight: 10
      },
    };

    return (
      <li style={onlineStyle.li}>
        <div
          style={{
            ...onlineStyle.list,
            backgroundColor:
              this.props.presenceState === "online" ? "#539eff" : "#414756"
          }}
        />{" "}
        {this.props.children}{" "}
      </li>
    );
  }
}

export default AnyoneOnlineList;
