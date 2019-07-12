import http from 'http'
import express from 'express'
import emitter from 'socket.io-emitter'

const app = express()
let server = http.createServer(app)

const io = emitter({ host: 'localhost', port: 6379 })

setInterval(() => {
  const data = {
    roomId: 49,
    userId: 122,
    publicKey: '51f539aa-e8b5-4ad5-8384-1396c134dd44',
    message: `WebSocket Bot ${new Date().toDateString()}`
  }
  io.of('/chat').in('51f539aa-e8b5-4ad5-8384-1396c134dd44').emit('add-message', data)
}, 5000)

server.listen(5003, 'localhost', () => {
  console.log(`Socket server http://localhost:5003`)
})