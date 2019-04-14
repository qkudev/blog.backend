import { Request, Response, NextFunction } from 'express'
import { apiKey } from '../utils/env'

export default function(req: Request, res: Response, next: NextFunction) {
  if (
    req.method === 'GET' ||
    req.method === 'HEAD' ||
    req.method === 'OPTIONS'
  ) {
    return next()
  }
  if (req.headers['authorization'] !== `Token ${apiKey}`) {
    return next({ name: 'UnauthorizedError' })
  }
  return next()
}
