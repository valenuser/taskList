const express = require('express')

const app = express()

const { db } = require('./connectiondb')

const morgan = require('morgan')

const ejs = require('ejs')


app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/public',express.static(__dirname+'/public'))

app.use('/views',express.static(__dirname+'/views'))
app.set('view engine','ejs')

app.use('/',require('./routes/index'))
app.use('/main',require('./routes/main'))
app.use('/client',require('./routes/client'))

app.listen(3000)
console.log('server running on port 3000');