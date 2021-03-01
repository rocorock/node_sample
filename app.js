'use strict'

const express = require('express')
const app = express()

app.use('/', require('./route/server'))

app.listen(3000)
