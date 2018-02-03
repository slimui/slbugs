import * as dynamoDbLib from '../util/dynamo'
export const loadProjectSettings = async (args, context) => {
	const params = {
		TableName: process.env.ProjectsTable,
		KeyConditionExpression: 'projectId = :projectId',
		ExpressionAttributeValues: {
			':projectId': args.projectId
		}
	}

	try {
		const result = await dynamoDbLib.call('query', params)
		const { name, dateCreated, userList } = result.Items[0]
		return {
			ok: true,
			name,
			dateCreated,
			userList: JSON.stringify(userList)
		}
	} catch (e) {
		console.log(e)
		return { ok: false }
	}
}
