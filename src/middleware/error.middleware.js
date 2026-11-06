import z, { ZodError } from 'zod'

import { AppError } from '../errors/app-error.js'

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  let errors = err.errors || null

  if (err instanceof ZodError) {
    statusCode = 422
    message = 'Validation error'
    errors = z.flattenError(err).fieldErrors
  } else if (err.code === 11000) {
    statusCode = 409
    message = 'Data jurnal harian sudah tersedia'
    errors = err.keyValue || null
  } else if (err.type === 'entity.parse.failed') {
    statusCode = 400
    message = 'Malformed JSON payload'
  } else if (err.name === 'CastError') {
    statusCode = 400
    message = 'Invalid ID format'
  }

  const isProduction = process.env.NODE_ENV === 'production'

  return res.status(statusCode).json({
    meta: {
      status: statusCode,
      message,
    },
    ...(errors && { errors }),
    ...(!isProduction && statusCode === 500 && { stack: err.stack }),
  })
}

export const notFoundHandler = (req, res, next) => {
  return next(
    new AppError(
      `Resource not found: ${req.method} ${req.originalUrl}`,
      404,
    ),
  )
}
