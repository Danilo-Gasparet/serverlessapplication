const Responses = require('../common/API_responses');
const Dynamo = require('../common/Dynamo');
const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event); 

    // Failed without a requestID 
    if (!event.pathParameters || !event.pathParameters.requestID) {
        return Responses._400({ message: 'Missing the requestID parameter from the path.' });
    }

    let requestID = event.pathParameters.requestID;

    const user = await Dynamo.get(requestID, tableName).catch(err => {
        console.log('Error in Dynamo Get', err); 
        return null;
    });

    if (!user){
        return Responses._400({ message: 'Failed to get the request by requestID'});
    }

    return Responses._200({ user }); 
};