const superagent = require('superagent')
// const rootApi = 'http://192.168.0.183:5000/wav_monitor/corpus'
const http = {
  rootApi: 'http://192.168.0.174:5556/',
  get(url, data) {
    return new Promise((resolve, reject) => {
      superagent
        .get(this.rootApi + url)
        .query(data)
        .then(res => {
          // res.body, res.headers, res.status
          resolve(res.body)
        })
        .catch(err => {
          reject(err)
          // err.message, err.response
        })
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      superagent
        .post(this.rootApi + url)
        .send(data)
        .then(res => {
          // res.body, res.headers, res.status
          resolve(res.body)
        })
        .catch(err => {
          reject(err)
          // err.message, err.response
        })
    })
  }
}

module.exports = http
