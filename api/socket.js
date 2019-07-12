import http from 'http'
import express from 'express'
import socket from 'socket.io'
import redisAdapter from 'socket.io-redis'
import { config, db } from './core/index'

const app = express()
let server = http.createServer(app)

const io = socket(server)
io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }))

// middleware
io.of('chat').use((socket, next) => {
  // console.log(socket.handshake)
  next()
})

// socket io
io.of('chat').on('connect', (socket) => {

  socket.on('disconnect', () => {
    console.info(`Client gone [id=${socket.id}]`)
  });
})

server.listen(config.server.port, config.server.host, () => {
  console.log(`Socket server http://${config.server.host}:${config.server.port}`)
});