import AWS from "aws-sdk";

const client = new AWS.S3();


export default {
    get   : (params) => client.getObject(params).promise(),
    put   : (params) => client.putObject(params).promise(),
};