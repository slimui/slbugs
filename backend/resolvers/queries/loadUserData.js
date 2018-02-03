import * as dynamoDbLib from '../util/dynamo'

export const loadUserData = async (args, context) => {
	const { claims } = context
	const params = {
		TableName: process.env.UsersTable,
		KeyConditionExpression: 'userId= :v1',
		ExpressionAttributeValues: {
			':v1': claims.sub
		}
	}

	try {
		const result = await dynamoDbLib.call('query', params)
		const { name, email, siteRole, projects } = result.Items[0]
		return {
			ok: true,
			projects: JSON.stringify(result.Items[0].projects),
			name,
			email,
			siteRole
		}
	} catch (e) {
		return {
			ok: false,
			error: ['User does not exist']
		}
	}
}
