import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-1' })

offlineOptions = {
	region: 'localhost',
	endpoint: 'http://localhost:8888'
}

var isOffline = function() {
	return process.env.IS_OFFLINE
}
export function call(action, params) {
	const dynamoDb = isOffline()
		? new AWS.DynamoDB.DocumentClient(offlineOptions)
		: new AWS.DynamoDB.DocumentClient()
	return dynamoDb[action](params).promise()
}
