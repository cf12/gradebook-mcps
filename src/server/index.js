const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const qs = require('qs')

const MCPSUser = require('./models/MCPSUser.js')

const app = express()

// TODO:
// - Auth flow where if a user's session is still intact, but the MyMCPS session is out, it'll reauth the user automatically
// - Data caching
// - Data persisting from redis db to session

// Session Setup
app.use(session({
  // TODO: Put in real secret
  secret: 'TESTING',
  // TODO: Set secure to true for HTTPS
  // secure: true,
  httpOnly: true,
  signed: true,
  name: 'session',
  resave: false
}))

// Express Setup
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

const PORT = process.env.port || 3001

app.get('/api/redis', (req, res) => {
  console.log(req.session)
  req.session.thing = 'lmao'
  res.status(200)
  res.end('OK')
})

app.get('/api/smth', (req, res) => {
  console.log(req.session)
  res.status(200)
  res.end('OK')
})

app.get('/api/logout', (req, res) => {
  req.session.destroy()

  res.status(200)
  res.end('Logout successful')
})

// TODO: Handle anonymous user
app.get('/api/classes', (req, res) => {
  console.log(req.session.user)
  req.session.user.getClasses()
})

// TODO: Require username + password
app.post('/api/login', (req, res) => {
  const user = new MCPSUser(req.body.username, req.body.password)

  user.login()
    .then((loggedIn) => {
      if (loggedIn) {
        req.session.user = user
        res.status(200)
        res.end('Login successful')
      } else {
        res.status(401)
        res.end('Invalid username and / or password')
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.end('An unexpected error has occurred')
    })
})


app.listen(PORT)
console.log('INFO >> Server started on port: ' + PORT)