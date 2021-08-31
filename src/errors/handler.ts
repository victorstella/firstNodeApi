import { ErrorRequestHandler } from 'express'

import { AppError } from './AppError'

const errorHandler: ErrorRequestHandler = (err, req, resp, _) => {
  if (err instanceof AppError) {
    return resp.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      detail: err.detail,
    })
  }

  console.error('[errorHandler]')
  if (err.response) {
    if (err.response.data) {
      console.error('err.response.config', err.response.config)
      console.error('err.response.data', err.response.data)
    } else {
      console.error(err.response)
    }
  } else {
    console.error(err)
  }
  return resp.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}

export default errorHandler