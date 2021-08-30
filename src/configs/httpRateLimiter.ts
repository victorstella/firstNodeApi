import { Request, Response, NextFunction } from 'express'

import { RateLimiterRedis } from 'rate-limiter-flexible'

import redis from './redis'

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'essap',
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
})

export default function rateLimiterRedisMiddleware(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next()
    })
    .catch(() => {
      console.error('@@@@ Too Many Requests, to ip: ', req.ip)

      resp.status(429).json('Too Many Requests')
    })
}