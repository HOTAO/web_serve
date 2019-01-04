const Qs = require('qs')
const api = require('./http')
const apis = {
  getQuestion(data) {
    return api.get('wav_monitor/corpus', data)
  },
  /**
   * @description 检查拼音和文本的合法性
   * @author HOTAO
   * @date 2019-01-03
   * @param {*} data text pinyin
   * @returns
   */
  chack(data) {
    return api.post('wav_monitor/criterion', Qs.stringify(data))
  }
}
module.exports = apis
