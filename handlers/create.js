const dynamoClient = require('../dynamoClient');
const {handleError, handleValidationError} = require('../helpers');

module.exports.default = (event, context, callback) => {
  const timestamp = new Date().getTime();

  const data = JSON.parse(event.body);

  if (typeof data.user_id !== 'number' || typeof data.idea_id !== 'number') {
    handleValidationError(callback);
    return;
  }

  // possibly make an api call and authenticate the validity of user_id and idea_id
  // ... or connect to the postgres db ...

  const params = {
    TableName: 'idea_votes',
    Item: {
      user_id: data.user_id,
      idea_id: data.idea_id,
      created_at: timestamp,
      updated_at: timestamp,
    },
  };

  dynamoClient.put(params, (error) => {
    // handle potential errors
    if (error) {
      handleError(error, callback, 'Error creating vote.');
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };

    callback(null, response);
  });
};
