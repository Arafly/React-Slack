import React, { Component } from 'react'
import Form from './components/UserForm'
import Screen from './pages/ChatScreen'

class App extends Component {
  state = {
    currentUser: " ",
    currentScreen: "YourUsernamePlease"
  }

  onUsernameSubmit = (username) =>{
    fetch('http://localhost:3301/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: username.json(),
      body: JSON.stringify({ username }),
    })
    .then(res => {
      console.log('Success!')
      this.setState ({
        currentUser: username,
        currentScreen: 'Screen'
      })
    })
    .catch(error => console.log('error', error))
  }

  render() {
    if (this.state.currentScreen === "YourUsernamePlease" ) {
      return <Form  onSubmit={ this.onUsernameSubmit } />
    }
    else if (this.state.currentScreen === "Screen") {
      return <Screen currentUser = { this.state.currentUser } />
    }
    return (
      <div className="App">
        <Form  onSubmit={ this.onUsernameSubmit } />
      </div>
    );
  }
}

export default App
