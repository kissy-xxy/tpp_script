const seats = require('./seat.json')
const multiHallSeats = require('./multiHallSeat.json')
const chooseBestSeat = require('./util/chooseBestSeat')
const logPP = obj => console.log(JSON.stringify(obj, null, 2))
const res = chooseBestSeat(seats)
const res2 = chooseBestSeat(multiHallSeats)
logPP(res)
logPP(res2)
