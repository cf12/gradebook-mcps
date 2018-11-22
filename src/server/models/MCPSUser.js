const crypto = require('crypto')
const tough = require('tough-cookie')

let request = require('superagent')
request = require('superagent-proxy')(request)

const proxy = 'http://localhost:8888'

const baseURL = 'https://portal.mcpsmd.org/guardian'

class MCPSUser {
  constructor (username, password) {
    this.username = username
    this.password = password
  }

  getPw () {
    const md5 = crypto.createHash('md5').update(this.password)
    const pw = md5.digest('base64').replace(/=/g, '')
    const hmac = crypto.createHmac('md5', '')
    hmac.update(pw)

    return hmac.digest('hex')
  }

  getDbpw () {
    const hmac = crypto.createHmac('md5', '')
    hmac.update(this.password.toLowerCase())

    return hmac.digest('hex')
  }

  login () {
    return new Promise((resolve, reject) => {
      const url = baseURL + '/home.html'
      const data = {
        account: this.username,
        ldappassword: this.password,
        // ContextData (the HMAC base) can be empty for some reason
        contextData: '',
        pw: this.getPw(),
        dbpw: this.getDbpw()
      }

      request.post(url)
        .type('form')
        .send(data)
        .redirects(0)
        .then(() => {
          resolve(false)
        })
        // Hacky workaround since superfetch directs 302's to err
        .catch(err => {
          if (err.status !== 302) reject(err)

          const response = err.response
          const cookies = response.headers['set-cookie'].map(tough.parse)

          console.log(cookies)

          // Cookie size check is just a precaution; valid logins should ALWAYS be a 302
          if (cookies.length === 4) {
            this.cookies = cookies
            resolve(true)
          } else {
            resolve(false)
          }
        })
    })
  }

  getClasses () {
    return new Promise((resolve, reject) => {
      // Any number works for this GET param; this is "wtf mcps?" encoded in binary
      const schoolid = '011101110111010001100110001000000110110101100011011100000111001100111111'

      request.get(baseURL + '/prefs/gradeByCourseSecondary.json')
        .set('Cookie', this.cookies.map(e => e.cookieString()).join(';'))
        .query({ schoolid: schoolid })
        .then(response => {
          console.log(response)
          resolve(JSON.parse(response.text))
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports = MCPSUser
