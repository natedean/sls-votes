const dynamoClient = require('../dynamoClient');
const {handleError} = require('../helpers');

module.exports.default = (event, context, callback) => {
  dynamoClient.scan({TableName: 'idea_votes'}, (error, result) => {
    // handle potential errors
    if (error) {
      handleError(error, callback, 'Failure fetching votes');
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };

    callback(null, response);
  });
};

