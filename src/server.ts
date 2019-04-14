import express from 'express'
import cors from 'cors'
import { env } from './utils'
import * as middlewares from './middlewares'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

if (env.CORS) {
  server.use(cors())
}
server.use('/api/v1', middlewares.router)
server.use(middlewares.errorHandler)

export default server
