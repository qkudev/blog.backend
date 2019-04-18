import { model as Post } from './model'

interface Pagination<T> {
  docs: T[]
  page: number
  limit: number
  total: number
  pages: number
}

interface IPostJSON {
  _id: string
  body: string
  createdAt: string
  updatedAt: string
}

type PaginatedPosts = Pagination<IPostJSON>

export const resolvers = {
  blogTitle: () => 'SHIT',
  postById: async function({ id }: ByID) {
    try {
      const post = await Post.findById(id)
      if (post) {
        return post.toJSON()
      }
      return null
    } catch (e) {
      return null
    }
  },
  posts: async function({
    pagination
  }: PaginationInput): Promise<PaginatedPosts | null> {
    const page = pagination.page || 1
    const limit = pagination.limit || 10

    try {
      const { docs: posts, pages, total } = await Post.paginate(
        {},
        {
          page: page,
          limit: limit,
          sort: '-createdAt'
        }
      )
      const docs = posts.map(post => post.toJSON())
      return { docs, page, limit, total, pages: pages || 1 }
    } catch (e) {
      return null
    }
  }
}

type CreateProps = {
  body: string
}

interface UpdateProps extends ByID {
  body: string
}

export const mutations = {
  createPost: async function({ body }: CreateProps) {
    try {
      const post = await Post.create({ body })
      if (post) {
        return post.toJSON()
      }
      return null
    } catch (e) {
      return null
    }
  },
  updatePost: async ({ id, body }: UpdateProps) => {
    const post = await Post.findById(id)
    if (post) {
      post.body = body
      return await post.save()
    }
    return post
  },
  deletePost: async ({ id }: ByID) => {
    return !!(await Post.findByIdAndDelete(id))
  }
}
