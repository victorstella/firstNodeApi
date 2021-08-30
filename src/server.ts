import express, { json } from 'express'

import routes from './routes'
import rateLimiterRedisMiddleware from './configs/httpRateLimiter'

import cors from 'cors'

export const app = express()

app
  .use(rateLimiterRedisMiddleware)
  // bom seu seja depois do rate limiter
  .use(cors())
  .use(json())
  .use(routes)

app.listen(3333, () => console.log('server running'))
