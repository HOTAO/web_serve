const router = require('koa-router')()
const userController = require('../controllers/user')
const routers = router
  .post('/login', userController.login)
  .get('/', async ctx => {
    ctx.body = 'Hello World'
  })

module.exports = routers
