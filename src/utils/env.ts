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

export const apiKey = parsed.API_KEY || ''
