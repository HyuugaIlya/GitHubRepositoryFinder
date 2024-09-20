import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react"

const url = 'https://api.github.com/graphql'
const GET_REPS = `query Reps($query: String!, $first: Int, $after: String, $last: Int, $before: String) {
  search(query: $query, type: REPOSITORY, first: $first, after: $after, last: $last, before: $before) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          id
          name
          forkCount
          description
          licenseInfo {
            name
          }
          languages(first: 5) {
            nodes {
              name
            }
          }
          stargazerCount
          updatedAt
          url
          primaryLanguage {
          	name
          }
        }
      },
      cursor
    },
    pageInfo {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor
    }
  }
}`

export type TNode = {
  description: string,
  forkCount: number,
  id: string,
  name: string,
  primaryLanguage: { name: string }
  stargazerCount: number,
  updatedAt: string,
  url: string
  licenseInfo: { name: string },
  languages: {
    nodes: {
      name: string
    }[]
  }
}
export type TRepository = {
  cursor: string,
  node: TNode,
}
export type TPageInfo = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string,
  endCursor: string
}
export type TRepositories = {
  data: {
    search: {
      edges: TRepository[],
      repositoryCount: number,
      pageInfo: TPageInfo
    }
  }
}

export type TQuery = {
  search?: string | null,
  first?: number | null,
  after?: string | null,
  last?: number | null,
  before?: string | null
}
export const repositoriesApi = createApi({
  reducerPath: 'repositoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  endpoints: (builder) => ({
    getRepositories: builder.query<TRepositories, TQuery>({
      query: ({
        search = '',
        first = 10,
        after,
        last,
        before
      }) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `bearer ${import.meta.env.VITE_GH_TOKEN}`
        },

        body: JSON.stringify({
          query: GET_REPS,
          variables: {
            query: `${search} in:name`,
            first,
            after,
            last,
            before
          }
        })
      })
    })
  }),
})

export const { useGetRepositoriesQuery } = repositoriesApi