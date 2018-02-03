import * as dynamoDbLib from './dynamo'
export const appendUserProjects = async ({
	projectName,
	projectId,
	userRole,
	userId
}) => {
	const params = {
		TableName: process.env.UsersTable,
		Key: {
			userId: userId
		},
		UpdateExpression: 'SET projects.#id = :project',
		ExpressionAttributeNames: {
			'#id': projectId
		},
		ExpressionAttributeValues: {
			':project': {
				name: projectName,
				role: userRole
			}
		},
		ReturnValues: 'UPDATED_NEW'
	}

	try {
		const result = await dynamoDbLib.call('update', params)
		if (result) {
			return true
		}
	} catch (e) {
		console.log(e)
		return false
	}
}
