const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler=(event,context,callback) =>{
    console.log("event::",JSON.stringify(event))


 let  dynamodbPut = (contactName,email) => { 
   return new Promise(async(resolve,reject)=>{
     let params={
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            Name:  contactName,
            Email: email
        }
     }
    console.log("params:::",params)
  dynamoDb.put(params,function(err, data) {
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
    
    let getEmail=JSON.parse(event.body)
    console.log(JSON.stringify(event))
    let email=getEmail.Email
    
     let putData=await dynamodbPut(event.pathParameters.name,email)
    

    callback(null, {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(event),
      })
  }

  main()
}