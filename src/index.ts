import express from 'express'
import cors from 'cors'
import { env } from './utils'

const { port } = env
const server = express()

server.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors()
)

server.listen(port, () => {
  console.log(`Server is on port ${port}`)
})
