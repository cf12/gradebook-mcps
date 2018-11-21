const redis = require('redis')

class RedisClient {
  constructor () {
    this.client = redis.createClient()

    this.client.on('error', (err) => {
      console.error(err)
    })
  }


}