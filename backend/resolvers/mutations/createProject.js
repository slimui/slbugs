import uuid from 'uuid'
import * as dynamoDbLib from '../util/dynamo'
import { appendUserProjects } from '../util/appendUserProjects'
export const createProject = async (args, context) => {
	const pId = uuid.v1()
	const { claims } = context

	const newUsers = {}
	newUsers[claims.sub] = {
		name: claims['custom:Name'],
		email: claims.email,
		role: 'Admin'
	}
	const params = {
		TableName: process.env.ProjectsTable,
		Item: {
			dateCreated: new Date(Date.now()).toISOString(),
			projectId: pId,
			name: args.name,
			userList: newUsers
		}
	}
	try {
		const shit = await dynamoDbLib.call('put', params)
		const UParams = {
			projectName: args.name,
			projectId: pId,
			userRole: 'Admin',
			userId: claims.sub
		}
		console.log(UParams)
		const ass = await appendUserProjects(UParams)

		return { ok: true, id: pId, name: args.name }
	} catch (e) {
		console.log(e)
	}
}
