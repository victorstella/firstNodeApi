import 'express-async-errors'
import express, { json } from 'express'
import socketio from 'socket.io'
import http from 'http'
import path from 'path'

import routes from './routes'
import rateLimiterRedisMiddleware from './configs/httpRateLimiter'

import cors from 'cors'
import errorHandler from './errors/handler'

export const app = express()
const httpServer = http.createServer(app)
const io = new socketio.Server(httpServer)

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`)
})

app
  .use(rateLimiterRedisMiddleware)
  // cors depois do rate limiter
  .use(cors())
  .use(errorHandler)
  .use(express.static(path.resolve(__dirname, '..', 'public')))
  .use(json())
  .use(routes)

httpServer.listen(3333, () => console.log('server running'))
app.listen(3333, () => console.log('server running'))