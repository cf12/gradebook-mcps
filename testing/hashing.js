const crypto = require('crypto')

const data = require('./data.json')

console.log('USERNAME: ' + data.username)
console.log('PASSWORD: [REDACTED]')
console.log('CONTEXT: ' + data.context)

const md5 = crypto.createHash('md5').update(data.password)

let pw = md5.digest('base64').replace(/=/g, '')

let hmac = crypto.createHmac('md5', data.context)
hmac.update(pw)
console.log('PW: ' + hmac.digest('hex'))

hmac = crypto.createHmac('md5', data.context)
hmac.update(data.password.toLowerCase())

console.log('DBPW: ' + hmac.digest('hex'))

