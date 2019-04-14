import express from 'express'
import cors from 'cors'
import { env } from './utils'
import router from './router'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

if (env.CORS) {
  server.use(cors())
}
server.use('/api/v1', router)

export default server
