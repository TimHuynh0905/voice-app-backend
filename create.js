import AWS from "aws-sdk";
import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamoDb";


const transcribeService = new AWS.TranscribeService();

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
            createdAt: Date.now()
        }
    };

    await dynamoDb.put(params);

    const TranscriptionJobName = data.attachment;

    const recordUrl = [
        'https://s3.amazonaws.com',
        process.env.s3_audio_bucket,
        `private/us-east-1:c2a89eaa-2a0d-4130-bb6f-be6432ab4fea/${TranscriptionJobName}`,
        // TranscriptionJobName,
    ].join('/');

    const transcribe_params = {
        LanguageCode: process.env.LANGUAGE_CODE,
        Media: { MediaFileUri: recordUrl },
        MediaFormat: 'mp3',
        TranscriptionJobName,
        OutputBucketName: process.env.s3_transcribe_bucket,
    };

    const response = await new Promise((resolve, reject) => {
        transcribeService.startTranscriptionJob(transcribe_params, (err, data) => {
            if (err) {
                reject(err);
            } // an error occurred
            else {
                console.log(data); // successful response
                resolve(data.TranscriptionJob.TranscriptionJobStatus);
            }
        });
    });
    return response;

});
