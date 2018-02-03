import 'babel-polyfill'
import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda'
import lambdaPlayground from 'graphql-playground-middleware-lambda'
import { makeExecutableSchema } from 'graphql-tools'
import { schema } from './schema'
import { resolvers } from './resolvers'

const myGraphQLSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers,
	logger: console
})

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false
	function callbackFilter(error, output) {
		if (!output.headers) {
			output.headers = {}
		}
		output.headers['Access-Control-Allow-Origin'] = '*'
		callback(error, output)
	}

	/* **************************************** */
	let sub, email

	/*
		if you are using the graphiql interface for testing, you will not have a claims object on your
		request you this sub id is hardcoded as my testing account's id. When you are using dynamodb-offline
		and dynamo db local, you will get your sub through the cognito call
	*/

	if (event.requestContext.authorizer.claims === undefined) {
		sub = 'b1b1856e-1ca0-41fe-93dc-3306cc8f897e'
		email = 'test@user.com'
	} else {
		// claims = event.requestContext.authorizer.claims
	}

	/* **************************************** */

	const handler = graphqlLambda({
		schema: myGraphQLSchema,
		tracing: true,
		context: { claims: event.requestContext.authorizer.claims } // claims used for userId/email
	})
	return handler(event, context, callbackFilter)
}

exports.graphiqlHandler = graphiqlLambda({
	endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT
})
