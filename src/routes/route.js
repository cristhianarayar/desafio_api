const router = require('express').Router()
const filesRouter = require('./files/joyasfiles')

router.use('/', filesRouter)

module.exports = router