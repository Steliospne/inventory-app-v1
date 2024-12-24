export const getErrorMessages = (array) => {
  let messages = {};
  array.forEach((error) => {
    const field = error.path[0];
    if (messages.hasOwnProperty(field)) {
      messages[field].push(error.message);
    } else {
      messages = { ...messages, [field]: [error.message] };
    }
  });
  return messages;
};
