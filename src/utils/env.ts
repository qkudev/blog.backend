import * as path from 'path'
import * as dotenv from 'dotenv'

const envFile = '.env.local'

const { parsed, error } = dotenv.config({
  path: path.resolve(process.cwd(), envFile)
})

if (error || !parsed) {
  throw new Error('EnvironmentError')
}

export const port = parsed.PORT || '5000'

export const CORS = !!parsed.CORS || false

export const apiKey = parsed.API_KEY || ''

const mongoUri = `mongodb://${parsed.MONGO_HOST ||
  'localhost'}:${parsed.MONGO_PORT || '27017'}`

export const mongo = {
  URI: mongoUri,
  dbName: parsed.MONGO_DB || 'blog_db',
  user: parsed.MONGO_USER || undefined,
  pass: parsed.MONGO_PASS || undefined,
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 50,
  reconnectInterval: 5000
}
