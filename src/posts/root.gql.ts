import { model as Post } from './model'

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
  paginatedPosts: async function({ pagination }: PaginationInput) {
    const pageNum = pagination.page || 1
    const pageLimit = pagination.limit || 10

    try {
      const result = await Post.paginate(
        {},
        {
          page: pageNum,
          limit: pageLimit,
          sort: '-createdAt'
        }
      )
      return result.docs.map(post => post.toJSON())
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
