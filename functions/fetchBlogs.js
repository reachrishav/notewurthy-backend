const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
	secret: 'fnAE9rfqPeAAVvVyKkFvQFBMYJ1e_j-jApagORKn',
})

exports.handler = async function (event, context) {

	let res = await client.query(
		q.Map(
			q.Paginate(q.Documents(q.Collection('blogs'))),
			q.Lambda('X', q.Get(q.Var('X')))
		)
	)
	
	let dataArr = res.data.map(item => item.data)

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(dataArr),
	}
}
