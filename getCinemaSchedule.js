const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, CINEMA_SCHEDULE_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr, { cinemaId }) {
  const ts = tsFunc()
  const dataObj = {
    cinemaId,
    hall: '',
    showVersion: '',
    h5AccessFlag: 0,
    platform: '8'
  }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.MtopScheduleAPI.getCinemaSchedules',
    v: '7.0',
    timeout: 10000,
    forceAntiCreep: false,
    AntiCreep: false,
    type: 'get',
    dataType: 'json',
    data: dataStr
  }
}
/**
 *
 * @param {string} cookieStr
 */
function getCinemaSchedule(cookieStr, payload) {
  const qsObj = genQsObj(cookieStr, payload)
  return tbFetch({
    cookie: cookieStr,
    url: CINEMA_SCHEDULE_URL,
    qsObj
  })
}
module.exports = getCinemaSchedule
