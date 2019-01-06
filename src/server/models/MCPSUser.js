const crypto = require('crypto')
const tough = require('tough-cookie')
const request = require('superagent')

const baseURL = 'https://portal.mcpsmd.org'

function genPw (password) {
  const md5 = crypto.createHash('md5').update(password)
  const pw = md5.digest('base64').replace(/=/g, '')
  const hmac = crypto.createHmac('md5', '')
  hmac.update(pw)

  return hmac.digest('hex')
}

function genDbpw (password) {
  const hmac = crypto.createHmac('md5', '')
  hmac.update(password.toLowerCase())

  return hmac.digest('hex')
}

class MCPSUser {
  constructor (username) {
    this.username = username
  }

  login (password) {
    return new Promise((resolve, reject) => {
      const url = baseURL + '/guardian/home.html'
      const data = {
        account: this.username,
        ldappassword: password,
        // ContextData (the HMAC base) can be empty for some reason
        contextData: '',
        pw: genPw(password),
        dbpw: genDbpw(password)
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
            this.cookies = cookies.map(e => e.cookieString()).join(';')
            resolve(true)
          } else {
            resolve(false)
          }
        })
    })
  }

  async baseRequestJSON (path, data) {
    return new Promise(async (resolve, reject) => {
      request.get(baseURL + path)
        .set('Cookie', this.cookies)
        .query(data)
        .then(response => {
          let data = JSON.parse(response.text)

          // MCPS likes to append empty objects to response arrays ¯\_(ツ)_/¯
          // This filters those out
          if (data instanceof Array) {
            data = data.filter(value => Object.keys(value).length !== 0)
          }

          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getClasses () {
    return this.baseRequestJSON(
      '/guardian/prefs/gradeByCourseSecondary.json',
      {
        // Any number works for this GET param
        schoolid: '1337'
      }
    )
  }

  getClassInfo (classID, schoolID, term) {
    return this.baseRequestJSON(
      '/guardian/prefs/assignmentGrade_CourseDetail.json',
      {
        secid: classID,
        schoolid: schoolID,
        termid: term
      }
    )
  }

  getClassGrades (classID, schoolID, term) {
    return this.baseRequestJSON(
      '/guardian/prefs/assignmentGrade_AssignmentDetail.json',
      {
        secid: classID,
        schoolid: schoolID,
        termid: term
      }
    )
  }

  getClassCategories (classID, schoolID, term) {
    return this.baseRequestJSON(
      '/guardian/prefs/assignmentGrade_CategoryDetail.json',
      {
        secid: classID,
        schoolid: schoolID,
        termid: term
      }
    )
  }

  getTerms (schoolID) {
    return this.baseRequestJSON(
      '/guardian/prefs/termsData.json',
      {
        schoolid: schoolID
      }
    )
  }
}

module.exports = MCPSUser
