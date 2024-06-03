const {getCtrJoyas,getCtrFilter} = require("../../controller/joyascontroller")
const fileroute = require('express').Router()
const logsServices = require('../../middlewares/logjoyas')

fileroute.get("/joyas",logsServices,getCtrJoyas)
fileroute.get("/joyas/filtros",logsServices,getCtrFilter)

module.exports = fileroute