export const checkValidationText = (textToCheck: string): boolean => {
  const testRegex = /^[a-zA-Z0-9а-яА-Я _.-]+$/;
  return testRegex.test(textToCheck);
};
