import mongoose from 'mongoose'
import { mongo } from './env'

const { URI, ...opts } = mongo

const connectToMongoDB = () => {
  mongoose.connect(URI, opts).then()
}

mongoose.connection.on('connecting', () => {
  console.log('connecting to MongoDB...')
})

mongoose.connection.on('connected', () => {
  console.log('successfully connected to MongoDB')
})

mongoose.connection.on('reconnected', () => {
  console.log('successfully reconnected to MongoDB')
})

mongoose.connection.on('error', (error: Error) => {
  console.error(`MongoDB connection error: ${error.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.error(`MongoDB client disconnected`)

  setTimeout(connectToMongoDB, opts.reconnectInterval)
})

connectToMongoDB()
