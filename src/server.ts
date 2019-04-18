import express from 'express'
import cors from 'cors'
import { env } from './utils'
import * as middlewares from './middlewares'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import * as Posts from './posts'
import * as Users from './users'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (env.CORS) {
  app.use(cors())
}

app.use('/api/v1', middlewares.router)

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [Posts.schema, Users.schema]
  }),
  rootValue: {
    ...Posts.resolvers,
    ...Posts.mutations,
    ...Users.resolvers
  },
  playground: true,
  introspection: true
})

server.applyMiddleware({
  app,
  path: '/api/v1/graphql'
})

app.use(middlewares.errorHandler)

export default app
