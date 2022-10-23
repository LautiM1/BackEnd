
import express from 'express'
import { router } from './src/routes/index.js'
import {engine} from 'express-handlebars'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.static('public'))


app.use('/', router)

app.listen(3000, () => console.log('Servidor iniciado puerto 3000')
)
