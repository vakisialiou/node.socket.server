import http from 'http'
import redis from 'redis'
import express from 'express'

const app = express()
let server = http.createServer(app)

const pub = redis.createClient(6379, '127.0.0.1')

const data = JSON.stringify({
  roomId: 49,
  userId: 122,
  publicKey: '51f539aa-e8b5-4ad5-8384-1396c134dd44',
  message: `Created by Bot ${new Date().toDateString()}`
})

setInterval(() => {
  pub.publish('bot-chanel', data)
}, 5000)

server.listen(5002, 'localhost', () => {
  console.log(`Socket server http://localhost:5002`)
});