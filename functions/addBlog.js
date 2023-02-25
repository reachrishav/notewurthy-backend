const { MongoClient } = require('mongodb')
require('dotenv').config()

const mongoClient = new MongoClient(process.env.MONGO_URI, {
	useNewUrlParser: true,
})

const clientPromise = mongoClient.connect()

exports.handler = async function (event, context) {
	let newBlog = JSON.parse(event.body)

	const database = (await clientPromise).db(process.env.MONGO_DB)
	const collection = database.collection(process.env.MONGO_COLLECTION)
	const result = await collection.insertOne(newBlog)

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(result),
	}
}
