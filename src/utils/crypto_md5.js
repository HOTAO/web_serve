const crypto = require('crypto')

const createMd5 = value => {
  /**
   * 每次都需要重新创建md5对象，不然会报错
   * https://www.jianshu.com/p/f1b01eabbe2d
   */
  const md5 = crypto.createHash('md5')
  // const id = Math.floor(Math.random() * 1e10)
  md5.update(String(value))
  return md5.digest('hex')
}
module.exports = { createMd5 }
