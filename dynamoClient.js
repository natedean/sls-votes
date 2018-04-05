const AWS = require('aws-sdk');

// Set the region
AWS.config.update({region: 'us-east-2'});

const client = new AWS.DynamoDB.DocumentClient({});

module.exports = client;
