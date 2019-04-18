export default `
  extend type Query {
    author: Author!
  }
  type Author {
    username: String!
    email: String!
    url: String!
  }
`
