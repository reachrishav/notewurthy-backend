const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
	secret: 'fnAE9rfqPeAAVvVyKkFvQFBMYJ1e_j-jApagORKn',
})

exports.handler = async function (event, context) {
	let newBlog = JSON.parse(event.body)
	const createP = await client.query(
		q.Create(q.Collection('blogs'), {
			data: { title: newBlog.title, description: newBlog.description },
		})
	)

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Headers': '*',
			// 'Access-Control-Allow-Methods': '*',
			'Access-Control-Max-Age': '86400',

			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Authorization, Content-Type',
			'Vary': 'Accept-Encoding, Origin',
			'Keep-Alive': 'timeout=2, max=100',
			'Connection': 'Keep-Alive',
		},
		body: JSON.stringify(createP),
	}
}
