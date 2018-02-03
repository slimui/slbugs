import uuid from 'uuid'
import * as dynamoDbLib from '../util/dynamo'
import { s3Upload } from '../util/s3'
export const createBug = async (args, context) => {
	console.log(args)
	const itemId = uuid.v1()
	/*
    the below code adds an array to the DynamoDB table which stores the projects
		access list for each user.
	*/
	const params = {
		TableName: process.env.ItemsTable,
		Item: {
			name: args.name,
			content: args.content,
			projectId: args.projectId,
			itemId: itemId,
			type: args.type,
			itemStatus: 'Active',
			dateCreated: new Date(Date.now()).toISOString(),
			tags: args.tags
		}
	}

	try {
		const shit = await dynamoDbLib.call('put', params)

		return { ok: true }
	} catch (e) {
		console.log(e)
	}
}
