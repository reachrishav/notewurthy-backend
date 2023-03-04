const faunadb = require("faunadb")
require("dotenv").config()

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.API_KEY,
})

exports.handler = async function (event) {
  let newBlog = JSON.parse(event.body)
  const headers = event.headers
  if (headers["access-token"] !== process.env.POST_TOKEN) {
    if (
      headers["access-token"] !== undefined ||
      process.env.POST_TOKEN !== undefined
    ) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
      }
    }
  }
  const createdPost = await client.query(
    q.Create(q.Collection("blogs"), {
      data: {
        title: newBlog.title,
        description: newBlog.description,
        updated_at: Date.now() * 1000,
        created_at: Date.now() * 1000,
      },
    })
  )

  console.log(newBlog)
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdPost),
  }
}
