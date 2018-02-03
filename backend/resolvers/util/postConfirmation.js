import * as dbLib from './dynamo'

module.exports.handler = async (event, context, callback) => {
	const params = {
		TableName: process.env.UsersTable,

		Item: {
			userId: event.request.userAttributes.sub,
			email: event.request.userAttributes.email,
			projects: {},
			siteRole: 'Admin',
			name: event.request.userAttributes['custom:Name']
		}
	}
	try {
		await dbLib.call('put', params)
		callback(null, event)
	} catch (e) {
		callback(null, e)
	}
}
