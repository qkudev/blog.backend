import { Request, Response, NextFunction } from 'express'

export default function(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!error) {
    return next()
  }
  switch (error.name) {
    case 'CastError':
    case 'NotFoundError': {
      res.status(404).json({ status: 404, message: 'NotFound' })
      return next()
    }
    default: {
      res.status(500).json({ status: 500, message: 'InternalServerError' })
      return next()
    }
  }
}
