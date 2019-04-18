import { importSchema } from 'graphql-import'

export const schema = importSchema(__dirname + '/schema.graphql')
export { IPost, model } from './model'
export { router } from './router'
export * from './root.gql'
