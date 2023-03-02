const faunadb = require('faunadb')
require('dotenv').config()

const q = faunadb.query
const client = new faunadb.Client({
	secret: process.env.API_KEY,
})

exports.handler = async function (event, context) {
    let blogUpdateRequest = JSON.parse(event.body);
    const idToEdit = blogUpdateRequest.id;
    const collection = "blogs";
  
    await client.query(q.Update(q.Ref(q.Collection(collection), idToEdit),{
        data: {
            title: blogUpdateRequest.title,
            description: blogUpdateRequest.description
        }
    }));
	return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Content-Type": "application/json",
        },
      };
}
