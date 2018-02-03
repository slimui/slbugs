import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getUserToken } from './auth'

const uri = process.env.REACT_APP_GRAPHQL_ENDPOINT

const httpLink = createHttpLink({ uri })

/*
	get the token from the decoded local storage and send it to the graphql endpoint
	with every request.
*/
const authLink = setContext(async (_, { headers }) => {
	const token = await getUserToken()
	return {
		headers: {
			...headers,
			Authorization: token ? token : null
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

export const ReactApolloProvider = props => (
	<ApolloProvider client={client}>{props.children}</ApolloProvider>
)
