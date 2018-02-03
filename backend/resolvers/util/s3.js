import AWS from 'aws-sdk'
AWS.config.update({ region: 'us-east-1' })

const offlineOptions = {
	params: {
		Bucket: process.env.UPLOAD_BUCKET
	},
	s3ForcePathStyle: true,
	endpoint: 'http://localhost:8000'
}
var isOffline = function() {
	return process.env.IS_OFFLINE
}

export async function s3Upload(file) {
	let S3
	if (isOffline()) {
		S3 = new AWS.S3(offlineOptions)
	} else {
		S3 = new AWS.S3()
	}

	return S3.upload({
		Key: file.name,
		Body: file,
		ContentType: file.type,
		ACL: 'public-read'
	}).promise()
}
