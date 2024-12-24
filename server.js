import express from 'express';
const app = express()
import router from './routes/users.js'

import { listPhonebook } from './lib/db-handler.js'


app.get('/', async (req, res) => {
  const phonebook = await listPhonebook()
  const data = { title: "phonebook", phonebook: phonebook }
  res.render('users/index', data)
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')



app.use('/users', router)

app.listen(3000)

