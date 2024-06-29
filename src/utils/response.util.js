exports.getSuccessResponse = (message, data) => {
  let response = {
    status: "success",
    message,
  };

  if (data) response.data = data;
  return response;
};

exports.getErrorResponse = (statusCode, message) => {
  return {
    status: "error",
    error: {
      message,
      statusCode,
    },
  };
};
