import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamoDb';

export const main = handler(async (event, context) => {
    const params = {
        TableName : process.env.tableName,

        Key : {
            userId : event.requestContext.identity.cognitoIdentityId,
            voiceId : event.pathParameters.id
        }
    };

    await dynamoDb.delete(params);

    return {status: true};
});