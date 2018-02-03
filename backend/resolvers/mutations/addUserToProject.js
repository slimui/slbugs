import * as dynamoDbLib from '../util/dynamo'
import { appendProjectUsers } from '../util/appendProjectUsers'
import { appendUserProjects } from '../util/appendUserProjects'
export const addUserToProject = async (args, context) => {
	console.log(args)
	const params = {
		TableName: process.env.UsersTable,
		IndexName: 'user_email_index',
		KeyConditionExpression: 'email = :email',
		ExpressionAttributeValues: {
			':email': args.email
		}
	}

	try {
		const result = await dynamoDbLib.call('query', params)
		if (result.Items.length > 0) {
			const user = result.Items[0]

			appendProjectUsers(args.projectId, user, args.userRole)
			const UserProjectParams = {
				projectName: args.projectName,
				projectId: args.projectId,
				userRole: args.userRole,
				userId: user.userId
			}
			appendUserProjects(UserProjectParams)
			return { ok: true }
		} else {
			return { ok: false, error: 'User Does Not Exists.' }
		}
	} catch (e) {
		return { ok: false, error: e }
	}
}
