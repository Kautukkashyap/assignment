const AWS = require('aws-sdk');

exports.handler=(event,context,callback) =>{
    console.log("event::",JSON.stringify(event))
    callback(null,'Event has been received')
}