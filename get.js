import AWS from "aws-sdk";
import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamoDb';

const s3 = new AWS.S3();

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,

        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            voiceId: event.pathParameters.id
        }
    };

    const resp = await dynamoDb.get(params);
    if (!resp.Item) {
        throw new Error("Item not found.");
    }

    const item = resp.Item;

    const transcript_params = {
        Bucket: process.env.s3_transcribe_bucket,
        Key: item.attachment + '.json',
    };

    const transcripts = await new Promise((resolve, reject) => {
        s3.getObject(transcript_params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            } else {
                resolve(JSON.parse(data.Body.toString()).results.transcripts);
            }
        });
    });

    const result = {
        item,
        attachment : item.attachment,
        transcript : transcripts[0].transcript,
    };

    return result;
});