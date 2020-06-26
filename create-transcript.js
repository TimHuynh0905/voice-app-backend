import AWS from "aws-sdk";
import handler from "./libs/handler-lib";

const transcribeService = new AWS.TranscribeService();

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const attachment = data.attachment;
    console.log(attachment);

    const recordUrl = [
        'https://s3.amazonaws.com',
        process.env.s3_audio_bucket,
        `private/${event.requestContext.identity.cognitoIdentityId}/${attachment}`,
    ].join('/');

    const params = {
        LanguageCode: process.env.LANGUAGE_CODE,
        Media: { MediaFileUri: recordUrl },
        MediaFormat: 'mp3',
        TranscriptionJobName: attachment,
        OutputBucketName: process.env.s3_transcribe_bucket,
    };

    const response = await new Promise((resolve, reject) => {
        transcribeService.startTranscriptionJob(params, (err, data) => {
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