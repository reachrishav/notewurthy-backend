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
	// const database = (await clientPromise).db(process.env.MONGO_DB)
	// const collection = database.collection(process.env.MONGO_COLLECTION)
	// const results = await collection.find({}).toArray()
	let results = await client.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection('blogs'))),
			q.Lambda('X', q.Get(q.Var('X')))
		)
	)

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(results),
	}
}
