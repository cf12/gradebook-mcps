const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const qs = require('qs')

const passport = require('passport')
const LocalStrategy = require('passport-local')

const MCPSHandler = require('./MCPSHandler.js')

let superagent = require('superagent')
superagent = require('superagent-proxy')(superagent)
const agent = superagent.agent()

const proxy = 'http://localhost:8888'

const app = express()

// Passport Setup


// Express Setup
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

const PORT = process.env.port || 3001

app.post('/api/login', (req, res) => {
  const handler = new MCPSHandler(req.body.password)
  const url = 'https://portal.mcpsmd.org/guardian/home.html'

  const data = {
    account: req.body.username,
    ldappassword: req.body.password,
    contextData: handler.getContext(),
    pw: handler.getPw(),
    dbpw: handler.getDbpw()
  }

  agent.post(url)
    .type('form')
    .send(data)
    .proxy(proxy)
    .then(response => {
      // CONTEXT: Any number works for this GET param; this is "wtf mcps?" encoded in binary
      const schoolid = '011101110111010001100110001000000110110101100011011100000111001100111111'

      agent.get('https://portal.mcpsmd.org/guardian/prefs/gradeByCourseSecondary.json')
        .proxy(proxy)
        .query({ schoolid: schoolid })
        .then(response => {
          console.log(JSON.parse(response.text))
        })

      res.status(200)
      res.end(response.text)
    })
})


app.listen(PORT)
console.log('INFO >> Server started on port: ' + PORT)