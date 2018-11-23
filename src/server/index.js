require('dotenv')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const qs = require('qs')

const config = require('./config/config.json')
const PORT = process.env.port || 3001

const MCPSUser = require('./models/MCPSUser.js')

const app = express()

const users = {}

// TODO:
// - Auth flow where if a user's session is still intact, but the MyMCPS session is out, it'll reauth the user automatically
// - Data caching
// - Data persisting from redis db to session
// - Automatic reauth based on secondsleft endpoint

// Session Setup
app.use(session({
  secret: config.secret,
  // TODO: Set secure to true for HTTPS
  // secure: true,
  httpOnly: true,
  signed: true,
  name: config.cookieName,
  resave: false
}))

app.use((req, res, next) => {
  if (req.session.id in users) {
    req.session.user = users[req.session.id]
  } else {
    req.session.user = undefined
  }

  next()
})

// Express Setup
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// Helpers
function unauthorized (res) {
  res.status(401)
  res.end('Unauthorized request')
}

app.get('/api/logSession', (req, res) => {
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
  if (!req.session.user) return unauthorized(res)

  req.session.user.getClasses()
    .then(data => {
      res.status(200)
      res.json(data)
    })
    .catch(err => {
      console.error(err)
      res.status(500)
      res.end('An unexpected error has occurred')
    })
})

// TODO: Require username + password
app.post('/api/login', (req, res) => {
  const user = new MCPSUser(req.body.username, req.body.password)

  user.login()
    .then((loggedIn) => {
      if (loggedIn) {
        users[req.session.id] = user
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