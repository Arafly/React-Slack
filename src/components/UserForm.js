import React, { Component } from "react";

class Form extends Component {
  state = {
    username: " "
  };

  onChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.username)
    this.props.onSubmit(this.state.username)
  };


  render() {
    return (
      <div>
        <h3>What's your username?</h3>
        <form onSubmit={ this.handleSubmit }>
          <label>
            Username:
            <input
              type="text"
              value={ this.state.username }
              onChange={ this.onChange }
              placeholder="Your full name"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Form;
