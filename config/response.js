// response.js

export const response = (data = {}, result) => {
  const { isSuccess, code, message } = data;

  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    result: result,
  };
};
