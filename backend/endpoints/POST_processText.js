const uuid = require('uuid');
const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    //Failed without an ID 
    if (!event.body) {
        return Responses._400({ message: 'Request missing required email field' });
    }

    const user = JSON.parse(event.body);
    user.requestID = uuid.v1()
    user.timestamp = new Date().getTime();
    user.processedText = (user.textToProcess).replace(user.find,user.replace);
    
    const newUser = await Dynamo.write(user, tableName).catch(err => {
        console.log('Error in Dynamo write', err);
        return null;
    })

    if (!newUser){
        return Responses._400({ message: 'Failed to write user by ID' });
        
    }

    return Responses._200({ user });
};

//// Used as a debugger :P 
// return {
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Methods': '*',
//         'Access-Control-Allow-Origin': '*',
//     },
//     statusCode: 200,
//     body: JSON.stringify({
//         message: 'WAT',
//         input: event,
//       }),
// };