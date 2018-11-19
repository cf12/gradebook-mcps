const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const qs = require('qs')
const agent = require('superagent').agent()

const app = express()

const MCPSHandler = require('./MCPSHandler.js')

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
    .then(response => {
      console.log(response)
      res.status(200)
      res.end(response.text)
    })
})


app.listen(PORT)
console.log('INFO >> Server started on port: ' + PORT)