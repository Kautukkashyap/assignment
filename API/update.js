const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler=(event,context,callback) =>{
    console.log("event::",JSON.stringify(event))


 let  dynamodbUpdate = (contactName,email) => { 
   return new Promise(async(resolve,reject)=>{
    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { "Name" : contactName },
        UpdateExpression: 'set Email = :x',
        ExpressionAttributeValues:{
          ":x":email
         }
       
   }
  dynamoDb.update(params,function(err, data) {
      if(err){
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Error in DyanamoDB Put',
          })
      }else {
          resolve(data)
      }
    });
  });
 }

async function  main() {
    
     let getEmail=JSON.parse(event.body)
     let email=getEmail.Email
    
     let update=await dynamodbUpdate(event.pathParameters.name,email)
    

    callback(null, {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Data Updated in Dynamodb',
      })
  }

  main()
}