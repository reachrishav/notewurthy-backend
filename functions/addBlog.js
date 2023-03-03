const faunadb = require('faunadb')
require('dotenv').config()

const q = faunadb.query
const client = new faunadb.Client({
	secret: process.env.API_KEY,
})

exports.handler = async function (event) {
	let newBlog = JSON.parse(event.body)
	const createdPost = await client.query(
		q.Create(q.Collection('blogs'), {
			data: { title: newBlog.title, 
				description: newBlog.description, 
				updated_at: Date.now() * 1000, 
				created_at: Date.now() * 1000 
			},
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
