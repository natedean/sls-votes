const handleError = (error, callback, message = 'That messed up, yo!') => {
  console.error(error);
  callback(null, {
    statusCode: error.statusCode || 501,
    headers: { 'Content-Type': 'text/plain' },
    body: message,
  });
};

const handleValidationError = (callback) => {
  console.error('Validation Failed');
  callback(null, {
    statusCode: 400,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Validation error.',
  });
};

module.exports = {
  handleError,
  handleValidationError
};
