import http from 'http'
import redis from 'redis'
import express from 'express'
import { config } from './core/index'

const app = express()
let server = http.createServer(app)

const pub = redis.createClient(config.redis.port, config.redis.host);
const sub = redis.createClient(config.redis.port, config.redis.host);

sub.on('subscribe', function (channel, count) {
  if (channel === 'init-chanel') {
    pub.publish('init-chanel', 'I am sending a message. count: ' + count)
  }
});

sub.on('message', function (channel, message) {
  console.log(channel, message)
})

sub.subscribe('init-chanel')

server.listen(config.server.port, config.server.host, () => {
  console.log(`Socket server http://${config.server.host}:${config.server.port}`)
});