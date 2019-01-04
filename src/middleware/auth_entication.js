const auth = require('../utils/auth_entication')

module.exports = async (ctx, next) => {
  const req = ctx.request
  if (/verify/.test(req.url)) {
    const token = req.header['web-access-token']
    if (token) {
      const info = await auth.verifyToken(token)
      if (info.status !== 200) {
        ctx.status = info.status
        ctx.body = info.errorMessage
        return
      }
      global.userInfo = info.data
      global.clientIp = ctx.request.ip
      ctx.userInfo = info.data
    } else {
      ctx.status = 401
      ctx.body = '请登录后再操作'
      return
    }
  }
  return await next()
}
