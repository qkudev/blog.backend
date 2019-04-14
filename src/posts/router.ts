import { Request, Response, NextFunction, Router } from 'express'
import { model as Post } from './model'

export async function paginatedList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { page, limit } = req.query
  try {
    const { docs, ...pagination } = await Post.paginate({}, { page, limit })
    const posts = docs.map(post => post.toJSON())

    res.status(200).json({ docs: posts, pagination })
    return next()
  } catch (e) {
    return next(e)
  }
}

export async function retrieveById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId } = req.params
  try {
    const post = await Post.findById(postId)

    if (!post) {
      return next(new Error('NotFound'))
    }
    res.status(200).json({ post: post.toJSON() })
    return next()
  } catch (e) {
    return next(e)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  const { body } = req.body
  try {
    const post = await Post.create({ body })
    res.status(201).json({ post: post.toJSON() })
    return next()
  } catch (e) {
    return next(e)
  }
}

export async function updateById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId } = req.params
  const { body } = req.body
  try {
    const post = await Post.findByIdAndUpdate(postId, { body })

    if (!post) {
      return next(new Error('NotFound'))
    }
    res.status(203).json({ post: post.toJSON() })
    return next()
  } catch (e) {
    return next(e)
  }
}

export async function removeById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId } = req.params
  try {
    await Post.findByIdAndDelete()
    res.status(204).json({ id: postId })
    return next()
  } catch (e) {
    return next(e)
  }
}

export const router = Router()

router.get('', paginatedList)
router.get('/:postId', retrieveById)
router.post('', create)
router.patch('/:postId', updateById)
router.delete('/:postId', removeById)
