declare module '*.graphql' {}

declare type PaginationInput = {
  pagination: {
    page?: number
    limit?: number
  }
}

declare interface ByID {
  id: string
}
