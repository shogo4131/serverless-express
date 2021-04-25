const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-northeast-1' });

const dynamoOptions =
  process.env.NODE_ENV === 'development'
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      }
    : {};

const documentClient = new AWS.DynamoDB.DocumentClient(dynamoOptions);

router.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

router.get('/users', (req, res) => {
  documentClient
    .get({
      TableName: 'Users',
      Key: {
        name: 'users',
      },
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

module.exports = router;
