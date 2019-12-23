const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler=(event,context,callback) =>{
    console.log("event::",JSON.stringify(event))


 let  getItem = (contactName) => { 
   return new Promise(async(resolve,reject)=>{
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          Name: contactName,
        },
      };
  dynamoDb.get(params,function(err, data) {
      if(err){
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err),
          })
      }else {
          resolve(data)
      }
    });
  });
 }

async function  main() {
    
    
     let dbItem=await getItem(event.pathParameters.name)
    callback(null, {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(dbItem),
      })
  }

  main()
}