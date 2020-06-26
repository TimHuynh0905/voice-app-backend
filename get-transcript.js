import AWS from "aws-sdk";
import handler from './libs/handler-lib';

const s3 = new AWS.S3();

export const main = handler(async (event, context) => {

    console.log(event.pathParameters.key);

    const params = {
        Bucket: process.env.s3_transcribe_bucket,
        Key: `${event.pathParameters.key}.json`,
    };

    const transcripts = await new Promise((resolve, reject) => {
        s3.getObject(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            } else {
                resolve(JSON.parse(data.Body.toString()).results.transcripts);
            }
        });
    });

    const result = transcripts[0].transcript;
    return result;
});