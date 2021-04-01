const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

let statusCode = null
let body = null

const E500 = 'Error al guardar los datos'

exports.handler = async (event) => {
    await saveData(event.body)
    
    const response = {
        statusCode,
        body
    };
    return response;
};

const saveData = async (data)=>{
    console.log(data)
    const params = {
        TableName: 'cl-customerPortal-newCustomer',
        Item: data
    }
    
    await db
    .put(params)
    .promise()
    .then(res=>{
        statusCode=200
        body={}
    })
    .catch(err=>{
        statusCode=500
        body={
            message:E500,
            error:err
        }
    })
    
}
