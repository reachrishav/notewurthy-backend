const { MongoClient } = require('mongodb')
require('dotenv').config()

const mongoClient = new MongoClient(process.env.MONGO_URI, {
	useNewUrlParser: true,
})

const clientPromise = mongoClient.connect()

exports.handler = async function (event, context) {
	const database = (await clientPromise).db(process.env.MONGO_DB)
	const collection = database.collection(process.env.MONGO_COLLECTION)
	const results = await collection.find({}).toArray()

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(results),
	}
}
