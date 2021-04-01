const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

const main = async (event) => {
  const tableName = 'CL-customerPortal-solicitudesFormOpt'
  var params = {
    TableName: tableName,
    ProjectionExpression: "id,service,subService,options",
    FilterExpression: "#sS = :value",
    ExpressionAttributeNames: {
      "#sS": "shortService",
    },
    ExpressionAttributeValues: {
      ":value": `${event.opt}`
    },
  };

  const datos = await docClient.scan(params).promise()
    .then(d => { return { status: 200, payload: d } })
    .catch(e => { return { status: 401, payload: e } })  // modificar por call back luego

  datos.payload.Items.sort(compare)

  return datos
}

exports.handler = main

const compare = (a, b) => {
  if (a.id < b.id) {
    return -1
  }
  if (a.id > b.id) {
    return 1
  }
  return 0
}