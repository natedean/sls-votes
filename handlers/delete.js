const dynamoClient = require('../dynamoClient');
const {handleError, handleValidationError} = require('../helpers');

module.exports.default = (event, context, callback) => {
  console.log('event', JSON.stringify(event));

  const data = event.pathParameters;

  if (!data || !data.user_id || !data.idea_id) {
    handleValidationError(callback);
    return;
  }

  const params = {
    TableName: 'idea_votes',
    Key: {
      user_id: Number(data.user_id),
      idea_id: Number(data.idea_id)
    }
  };

  dynamoClient.delete(params, (error) => {
    // handle potential errors
    if (error) {
      handleError(error, callback, 'Error deleting vote.');
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: 'Successfully deleted vote.',
    };

    callback(null, response);
  });
};
