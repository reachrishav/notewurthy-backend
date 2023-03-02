const faunadb = require("faunadb");
require("dotenv").config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.API_KEY,
});

exports.handler = async function () {
  let res = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("blogs"))),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  );

  let dataArr = res.data.map((item) => {
    return { ...item.data, id: item.ref.id };
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(dataArr),
  };
};
