const db_user = require('../models/user')
const authEntication = require('../utils/auth_entication')
const md5 = require('../utils/crypto_md5')

const user = {
  async login(ctx) {
    const post_data = ctx.request.body
    const isHas = await db_user.isHasUserByUsername(post_data.username)
    if (!isHas) {
      ctx.response.status = 400
      ctx.response.body = { error: '当前用户不存在' }
      return
    }
    post_data.password = md5.createMd5(post_data.password)
    const userInfo = await db_user.getOneByUserNameAndPassword(post_data)
    if (userInfo.status === 200) {
      let authInfo = authEntication.generateToken({
        username: userInfo.data.username,
        password: userInfo.data.password
      })
      delete userInfo.data.password
      db_user.updateUserById({ last_login_time: +new Date() }, userInfo.data.id)
      ctx.response.body = {
        userInfo,
        authInfo
      }
    } else {
      ctx.status = userInfo.status
      ctx.response.body = userInfo.error
    }
  },
  async register() {
    const post_data = ctx.request.body
    const isHas = await db_user.isHasUserByUsername(post_data.username)
    if (isHas) {
      ctx.response.status = 400
      ctx.response.body = { error: '当前用户名已存在' }
      return
    }
    post_data.password = md5.createMd5(post_data.password)
  }
}
module.exports = user
