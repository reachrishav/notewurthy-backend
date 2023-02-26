const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
	secret: 'fnAE9rfqPeAAVvVyKkFvQFBMYJ1e_j-jApagORKn',
})

exports.handler = async function (event, context) {
	let newBlog = JSON.parse(event.body)
	const createdPost = await client.query(
		q.Create(q.Collection('blogs'), {
			data: { title: newBlog.title, description: newBlog.description },
		})
	)

	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST',
			'Access-Control-Allow-Headers': 'Authorization, Content-Type',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify(createdPost),
	}
}
