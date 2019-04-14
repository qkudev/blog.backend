import * as path from 'path'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

export const rootDir = process.cwd()

const envNames = ['test', 'local', 'development', 'production']

let envFile

for (let name of envNames) {
  let filePath = path.resolve(rootDir, `.env.${name}`)

  if (process.env.ENV === name && fs.existsSync(filePath)) {
    envFile = filePath
    break
  }
}

if (!envFile) {
  const prodPath = path.resolve(rootDir, '.env.production')

  if (fs.existsSync(prodPath)) {
    envFile = prodPath
  } else {
    throw new Error('EnvironmentError')
  }
}

console.log(`Using env file: ${envFile}`)

const { parsed, error } = dotenv.config({
  path: envFile
})

if (error || !parsed) {
  throw new Error('EnvironmentError')
}

export const port = parsed.PORT || '5000'

export const CORS = !!parsed.CORS || false

export const apiKey = parsed.API_KEY || ''

const mongoUri = `mongodb://${parsed.MONGO_HOST ||
  'localhost'}:${parsed.MONGO_PORT || '27017'}`

const mongoTimeout = 10000

export const mongo = {
  URI: mongoUri,
  dbName: parsed.MONGO_DB || 'blog_db',
  user: parsed.MONGO_USER || undefined,
  pass: parsed.MONGO_PASS || undefined,
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 50,
  reconnectInterval: 5000,
  connectTimeoutMS: mongoTimeout,
  socketTimeoutMS: mongoTimeout
}
