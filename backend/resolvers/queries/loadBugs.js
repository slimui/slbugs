import * as dynamoDbLib from '../util/dynamo'
export const loadBugs = async (args, context) => {
	const params = {
		TableName: process.env.ItemsTable,
		KeyConditionExpression: 'projectId = :projectId',
		ExpressionAttributeValues: {
			':projectId': args.projectId
		}
	}

	try {
		const result = await dynamoDbLib.call('query', params)
		const items = result.Items

		return {
			ok: true,
			items
		}
	} catch (e) {
		console.log(e)
	}
}
