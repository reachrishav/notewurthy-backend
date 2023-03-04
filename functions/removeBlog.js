const faunadb = require("faunadb")
require("dotenv").config()

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.API_KEY,
})

exports.handler = async function (event) {
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
  let blogRemovalRequest = JSON.parse(event.body)

  const idToDelete = blogRemovalRequest.id
  const collection = "blogs"

  await client.query(q.Delete(q.Ref(q.Collection(collection), idToDelete)))

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Content-Type": "application/json",
    },
  }
}
