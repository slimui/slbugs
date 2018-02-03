import * as dynamoDbLib from './dynamo'
export const appendProjectUsers = async (projectId, user, role) => {
	const params = {
		TableName: process.env.ProjectsTable,
		Key: {
			projectId: projectId
		},
		UpdateExpression: 'SET userList.#id = :user',
		ExpressionAttributeNames: {
			'#id': user.userId
		},
		ExpressionAttributeValues: {
			':user': {
				name: user.name,
				email: user.email,
				role: role
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
