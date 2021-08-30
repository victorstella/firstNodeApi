import express, { json } from 'express'

import routes from './routes'
import rateLimiterRedisMiddleware from './configs/httpRateLimiter'

export const app = express()

app
  .use(rateLimiterRedisMiddleware)
  .use(json())
  .use(routes)

app.listen(3333, () => console.log('server running'))