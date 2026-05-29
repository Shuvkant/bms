import { WebSocketServer } from 'ws'
import { client } from '@repo/db/client'
import "dotenv/config"

const server = new WebSocketServer({
  port: 3001,
})

server.on('connection', async (socket) => {
  await client.user.create({
    data: {
      username: Math.random().toString(),
      password: Math.random().toString(),
    },
  })
  socket.send('Hi there you are connected to the server, are you all rights')
})
