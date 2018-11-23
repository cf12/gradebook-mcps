const crypto = require('crypto')
const tough = require('tough-cookie')

let request = require('superagent')
request = require('superagent-proxy')(request)

const proxy = 'http://localhost:8888'

const baseURL = 'https://portal.mcpsmd.org'

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

  reAuth () {
    return new Promise(async (resolve, reject) => {
      if (this.expiration - Date.now() <= 0) await this.login()
      resolve()
    })
  }

  login () {
    return new Promise((resolve, reject) => {
      const url = baseURL + '/guardian/home.html'
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
          const cookies = response.headers['set-cookie'].map(e => tough.parse(e))

          console.log(cookies)

          // Cookie size check is just a precaution; valid logins should ALWAYS be a 302
          if (cookies.length === 4) {
            this.cookies = cookies
            this.cookieString = cookies.map(e => e.cookieString()).join(';')
            this.expiration = Date.now() + (60 * 28)
            resolve(true)
          } else {
            resolve(false)
          }
        })
    })
  }

  async getClassInfo (classID, term) {
    await this.reAuth()
    return new Promise(async (resolve, reject) => {

      // Any number works for this GET param; this is "wtf mcps?" encoded in binary
      const schoolid = '011101110111010001100110001000000110110101100011011100000111001100111111'

      request.get(baseURL + '/guardian/prefs/gradeByCourseSecondary.json')
        .set('Cookie', this.cookieString)
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

  async getClasses () {
    await this.reAuth()
    return new Promise(async (resolve, reject) => {

      // Any number works for this GET param; this is "wtf mcps?" encoded in binary
      const schoolid = '011101110111010001100110001000000110110101100011011100000111001100111111'

      request.get(baseURL + '/guardian/prefs/gradeByCourseSecondary.json')
        .set('Cookie', this.cookieString)
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
