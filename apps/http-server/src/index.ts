import express from 'express'
import { client } from '@repo/db/client'
import 'dotenv/config'
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send(
    'Hi there,this is the http server, changes made in here are synced using cicd',
  )
})

app.post('/signup', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const user = await client.user.create({
    data: {
      username: username,
      password: password,
    },
  })
  res.json({
    message: 'signup successful',
    id: user.id,
  })
})

app.listen(3002, () => {
  console.log('Http server is running at port 3002')
})
