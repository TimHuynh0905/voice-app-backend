# Voice Transcriber Application Backend Overview
(Note: This application is inspired by this [Serverless Stack](https://serverless-stack.com/) guide)

A serverless backend server built with Amazon Web Services.

Application: [transcribe-voices.com](https://transcribe-voices.com/)


### Requirements
- [Node.js](https://nodejs.org/en/)
- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [AWS Lambda, S3, API Gateway, Transcribe API, Route 53](https://aws.amazon.com/)

### Installation

To create a new Serverless project.

``` bash
$ serverless install --url https://github.com/AnomalyInnovations/serverless-nodejs-starter --name my-project
```

Enter the new directory

``` bash
$ cd my-project
```

Install the Node.js packages

``` bash
$ npm install
```

### Usage

To run a function on your local

``` bash
$ serverless invoke local --function hello
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function hello
```

#### Running Tests

Run your tests using

``` bash
$ npm test
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).
