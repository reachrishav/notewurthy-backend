// const { MongoClient } = require('mongodb')
// require('dotenv').config()

// const mongoClient = new MongoClient(process.env.MONGO_URI, {
// 	useNewUrlParser: true,
// })

// const clientPromise = mongoClient.connect()

// exports.handler = async function (event, context) {
// 	let newBlog = JSON.parse(event.body)

// 	const database = (await clientPromise).db(process.env.MONGO_DB)
// 	const collection = database.collection(process.env.MONGO_COLLECTION)
// 	const result = await collection.insertOne(newBlog)

// 	return {
// 		statusCode: 200,
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Access-Control-Allow-Origin': '*',
// 		},
// 		body: JSON.stringify(result),
// 	}
// }

// const { MongoClient } = require('mongodb')
// require('dotenv').config()

// const mongoClient = new MongoClient(process.env.MONGO_URI, {
// 	useNewUrlParser: true,
// })

// const clientPromise = mongoClient.connect()
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
	secret: 'fnAE9rfqPeAAVvVyKkFvQFBMYJ1e_j-jApagORKn',
	// // NOTE: Use the correct endpoint for your database's Region Group.
	// endpoint: 'https://db.fauna.com/',
})

exports.handler = async function (event, context) {
	let newBlog = JSON.parse(event.body)
	console.log(event.body)
	// const database = (await clientPromise).db(process.env.MONGO_DB)
	// const collection = database.collection(process.env.MONGO_COLLECTION)
	// const result = await collection.insertOne(newBlog)
	const createP = client.query(
		q.Create(q.Collection('blogs'), {
			data: { title: newBlog.title, description: newBlog.description },
		})
	)

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Authorization, Content-Type',
		},
		body: JSON.stringify(result),
	}
}
