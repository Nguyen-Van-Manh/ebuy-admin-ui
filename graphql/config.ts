import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: 'https://ebuy-ecommerce.herokuapp.com/graphql'
})
let token = ''
const authLink = setContext((_, { headers }) => {
    if (typeof window !== "undefined") {
        token = JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}')?.user || '{}')?.token
    }
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})


export const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})