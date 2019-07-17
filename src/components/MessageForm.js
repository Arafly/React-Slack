import React, { Component } from "react";

class MessageForm extends Component {
  state = {
    text: " "
  };

  onChange = e => {
    this.setState({
      text: e.target.value
    });
    if (this.props.onChange) {
      this.props.onChange;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.text);
    this.props.onSubmit(this.state.text);
    this.setState({ text: " " });
  };

  render() {
    const messageStyle = {
      container: {
        padding: 20,
        borderTop: "1px #4C758F solid",
        marginBottom: 20
      },
      form: {
        display: "flex"
      },
      inputMessage: {
        color: "inherit",
        background: "none",
        outline: "none",
        border: "none",
        flex: 1,
        fontSize: 16
      }
    };

    return (
      <div style={messageStyle.container}>
        <div>
          <form onSubmit={this.handleSubmit} style={messageStyle.form}>
            <input
              type="text"
              placeholder="Type a message here then hit ENTER"
              onChange={this.onChange}
              value={this.state.text}
              style={messageStyle.inputMessage}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default MessageForm;
