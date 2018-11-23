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
// - Data caching
// - Data persisting from redis db to session
// - Hook unauthorized function into express as middleware and modulate endpoints

// Session Setup
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  name: config.cookieName,
  cookie: {
    // TODO: Set secure to true for HTTPS
    // secure: true,
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() + (2 * 60 * 60 * 1000))
  }
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
app.use(bodyParser.urlencoded({ extended: true }))

app.disable('x-powered-by')

// Helpers
function unauthorized (res) {
  res.status(401)
  res.end('Unauthorized request')
}

// Endpoints
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

app.get('/api/classinfo', (req, res) => {
  if (!req.session.user) return unauthorized(res)

  req.session.user.getClassInfo(
    req.body.classID,
    req.body.schoolID,
    req.body.term
  )
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

app.get('/api/classgrades', (req, res) => {
  if (!req.session.user) return unauthorized(res)

  req.session.user.getClassGrades(
    req.body.classID,
    req.body.schoolID,
    req.body.term
  )
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