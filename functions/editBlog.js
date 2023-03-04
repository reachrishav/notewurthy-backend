const faunadb = require("faunadb")
require("dotenv").config()

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.API_KEY,
})

exports.handler = async function (event) {
  let blogUpdateRequest = JSON.parse(event.body)
  const headers = event.headers
  if (
    headers["access-token"] &&
    process.env.POST_TOKEN &&
    headers["access-token"] === process.env.POST_TOKEN
  ) {
    const idToEdit = blogUpdateRequest.id
    const collection = "blogs"

    await client.query(
      q.Update(q.Ref(q.Collection(collection), idToEdit), {
        data: {
          title: blogUpdateRequest.title,
          description: blogUpdateRequest.description,
          updated_at: Date.now() * 1000,
        },
      })
    )
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Content-Type": "application/json",
      },
    }
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized to perform this action." }),
    }
  }
}
