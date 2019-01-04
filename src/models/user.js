const dbUtils = require('../utils/db')
const table_name = 'user'
const user = {
  /**
   * @description
   * @author HOTAO
   * @date 2018-11-27
   * @param {*} userName 用户名
   * @returns Boolean
   */
  async isHasUserByUsername(username) {
    const _sql = `select id from ${table_name} where username = "${username}" limit 1;`
    const result = await dbUtils.query(_sql)
    return result.length > 0
  },
  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword(options) {
    let _sql = `
      SELECT * from ${table_name} 
      where password="${options.password}" 
      and username="${options.username}" limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = {
        status: 200,
        data: result[0]
      }
    } else {
      result = { status: 400, error: '密码不正确' }
    }
    return result
  },
  async register(model) {
    model.create_time = +new Date()
    const result = await dbUtils.query(table_name, model)
    return result
  },
  /**
   * @description 根据id修改用户信息
   * @author HOTAO
   * @date 2018-12-28
   * @param {*} values
   * @param {*} id
   * @returns
   */
  async updateUserById(values, id) {
    const result = await dbUtils.updateData(table_name, values, id)
    return result
  }
}
module.exports = user
