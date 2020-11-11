const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(requestID, TableName){
        const params = {
            TableName,
            Key: {
                requestID,
            },
        };
    
        const data = await documentClient.get(params).promise();
        
        if (!data || !data.Item){
            throw Error(`There was an error fetching the data for the request- ${requestID} from ${TableName}`);
        }

        console.log(data);

        return data.Item; 

    },

    async write(data, TableName){
        const params = {
            TableName, 
            Item: data
        }; 

        const res = await documentClient.put(params).promise();

        if (!res){
            throw Error(`There was an error inserting information from user- ${data.email} in table ${TableName}`);
        }
        return data; 
    }

};
module.exports = Dynamo; 