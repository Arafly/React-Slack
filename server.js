const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
require("dotenv")

const app = express()

// Instantiate own chatkit instance with the provided Instance Locator and Key
const chatkit = new Chatkit.default({
  instanceLocator: process.env.instanceLocator,
  key: process.env.key
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const ora = require('ora');
const throbber = ora('Rounding up all the alligators').start();
// Simulating some asynchronous work for 10 seconds...
setTimeout(() => {
  throbber.stopAndPersist({
    // symbol: '🐊',
    // symbol: ['🐊', '🐢', '🦎', '🐍'],
    symbol: [
      "🙈 ",
			"🙈 ",
			"🙉 ",
			"🙊 "
    ],
    text: 'All done rounding up the alligators!',
  });
}, 1000 * 10);

app.get('/', (req, res)=> {
  res.send("Up and running. Don't stress me please");
})

app.post('/users', (req,res)=> {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(()=> res.sendStatus(201))
    .catch(error => {
      if(error.error === 'services/chatkit/user_already_exists'){
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/auth', (req, res)=>{
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  })
  res.status(authData.status).send(authData.body)
})

const PORT = process.env.PORT || 3301;
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
