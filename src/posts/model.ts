import { Document, model as Model, Schema } from 'mongoose'

const paginate = require('mongoose-paginate')

export interface IPost extends Document {
  body: string
  createdAt: Date
  updatedAt: Date
}

export const schema = new Schema(
  {
    body: {
      type: String,
      required: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

schema.plugin(paginate)

export const model = Model<IPost>('Post', schema)
