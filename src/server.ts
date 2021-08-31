import 'express-async-errors'
import express, { json } from 'express'

import routes from './routes'
import rateLimiterRedisMiddleware from './configs/httpRateLimiter'

import cors from 'cors'
import errorHandler from './errors/handler'

export const app = express()

app
  .use(rateLimiterRedisMiddleware)
  // cors depois do rate limiter
  .use(cors())
  .use(errorHandler)
  .use(json())
  .use(routes)

app.listen(3333, () => console.log('server running'))
