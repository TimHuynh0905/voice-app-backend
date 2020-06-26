import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamoDb';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName : process.env.tableName,

        Key : {
            userId: event.requestContext.identity.cognitoIdentityId,
            voiceId: event.pathParameters.id
        },

        UpdateExpression: "SET content = :content, isTranscribed = :isTranscribed",
        ExpressionAttributeValues : {
            ':content' : data.content || null,
            ':isTranscribed' : data.isTranscribed || null,
        },

        ReturnValues: "ALL_NEW"
    };

    await dynamoDb.update(params);

    return {status: true};
});