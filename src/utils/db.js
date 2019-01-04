const mysql = require('mysql')

const pool = mysql.createPool({
  host: '192.168.0.180',
  user: 'tools',
  password: 'root',
  database: 'tools',
  charset: 'utf8mb4'
})
const db = {
  /**
   * @description 封装的sql语句执行函数
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} sql sql语句
   * @param {*} values sql参数（选传）
   * @returns
   */
  query(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  },
  /**
   * @description 新建表
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} sql sql语句
   * @returns
   */
  createTable(sql) {
    return this.query(sql, [])
  },
  /**
   * @description 按Id查询
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} id  查询Id
   * @returns
   */
  selectById(table, id) {
    let _sql = 'SELECT * FROM ?? WHERE id = ?'
    return this.query(_sql, [table, id])
  },
  /**
   * @description 插入数据
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} values 插入内容
   * @returns
   */
  insertData(table, values) {
    let _sql = 'INSERT INTO ?? SET ?'
    return this.query(_sql, [table, values])
  },
  /**
   * @description 根据id删除数据
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} id 行ID
   * @returns
   */
  deleteDataById(table, id) {
    let _sql = 'DELETE FROM ?? WHERE id = ?'
    return this.query(_sql, [table, id])
  },
  /**
   * @description 根据id修改数据
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @param {*} values 更新字段键值对 例如：{id: 123}
   * @param {*} id 行ID
   * @returns
   */
  updateData(table, values, id) {
    let _sql = 'UPDATE ?? SET ? WHERE id = ?'
    return this.query(_sql, [table, values, id])
  },
  /**
   * @description 查询该表总条数
   * @author HOTAO
   * @date 2018-07-05
   * @param {*} table 表名
   * @returns
   */
  count(table) {
    let _sql = 'SELECT COUNT(*) AS total_count FROM ?? '
    return this.query(_sql, [table])
  }
}

module.exports = db
