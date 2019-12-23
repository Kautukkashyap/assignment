const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler=(event,context,callback) =>{
    console.log("event::",JSON.stringify(event))


 let  dbdelete = (contactName) => { 
   return new Promise(async(resolve,reject)=>{
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          Name: contactName
        }
      }
  dynamoDb.delete(params,function(err, data) {
      if(err){
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Error in DyanamoDB Delete',
          })
      }else {
          resolve(data)
      }
    });
  });
 }

async function  main() {
    
    
     let deleted=await dbdelete(event.pathParameters.name)
    

    callback(null, {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Data Updated in Dynamodb',
      })
  }

  main()
}