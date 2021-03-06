const headlessLogin = require('./headlessLogin')
const preLockSeat = require('./preLockSeat')
const queryScheduleSeat = require('./queryScheduleSeat')
const lockSeat = require('./lockSeat')
const tppUserSimple = require('./tppUserSimple')
const prePlaceOrder = require('./prePlaceOrder')
const prePayCheck = require('./prePayCheck')
const payCheck = require('./payCheck')
const placeOrder = require('./placeOrder')

const ctx = {}
const scheduleId = '540462725'
const config = {
  ticketNum: 6
}

headlessLogin()
  .then(s => {
    ctx.cookie = s
    return queryScheduleSeat(s, scheduleId)
  })
  .then(scheduleSeatResponse => {
    return preLockSeat(scheduleSeatResponse, config).then(lockPayload => {
      return Promise.all([
        lockSeat(ctx.cookie, lockPayload),
        tppUserSimple(ctx.cookie)
      ]).then(([lockResponse, tud]) => {
        ctx.tppUserSimpleData = tud
        return prePayCheck(tud, lockPayload)
      })
    })
  })
  .then(payCheckPayload => payCheck(ctx.cookie, payCheckPayload))
  .then(payCheckResponse => {
    return prePlaceOrder(ctx.tppUserSimpleData, payCheckResponse)
  })
  .then(placeOrderPayload => {
    return placeOrder(ctx.cookie, placeOrderPayload)
  })
  .then(r => console.log(r))
  .catch(e => console.log(e))
