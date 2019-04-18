const author: IAuthor = {
  username: 'qkudev',
  email: 'qkud.ev@gmail.com',
  url: 'https://github.com/qkudev'
}

export interface IAuthor {
  username: string
  email: string
  url: string
}

export const resolvers = {
  author: () => author
}
