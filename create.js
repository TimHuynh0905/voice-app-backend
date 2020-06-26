import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamoDb";


export const main = handler(async (event, context) => {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            voiceId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            isTranscribed: false,
            createdAt: Date.now()
        }
    };

    await dynamoDb.put(params);

    return params.Item;
});
