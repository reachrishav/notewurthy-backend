const faunadb = require("faunadb");
require("dotenv").config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.API_KEY,
});

exports.handler = async function (event, context) {
  let blogRemovalRequest = JSON.parse(event.body);
  const searchString = blogRemovalRequest.title;
  const collection = "blogs";

  const deleteDoc = async (doc) => {
    let ref = doc.ref;
    await client.query(q.Delete(ref));
  };

  let allDocuments = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection(collection))),
      q.Lambda((x) => q.Get(x))
    )
  );
  let documentsInArray = Array.from(allDocuments.data);

  let filteredDocuments = documentsInArray.filter(doc => doc.data.title === searchString);
  filteredDocuments.forEach(deleteDoc);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(deletedPost),
  };
}
