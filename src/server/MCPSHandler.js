const crypto = require('crypto')
const uniqid = require('uniqid')

class MCPSHandler {
  constructor (password) {
    this.password = password
    this.context = this.genContext()
  }

  genContext () {
    // TODO: Maybe use custom prefix to let MCPS know about context?
    return uniqid()
  }

  getContext () {
    return this.context
  }

  getPw () {
    const md5 = crypto.createHash('md5').update(this.password)
    const pw = md5.digest('base64').replace(/=/g, '')
    const hmac = crypto.createHmac('md5', this.context)
    hmac.update(pw)

    return hmac.digest('hex')
  }

  getDbpw () {
    const hmac = crypto.createHmac('md5', this.context)
    hmac.update(this.password.toLowerCase())

    return hmac.digest('hex')
  }
}

module.exports = MCPSHandler
