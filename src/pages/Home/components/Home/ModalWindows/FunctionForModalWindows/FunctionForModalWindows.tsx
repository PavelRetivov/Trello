export const checkTitle = (text: string) => {
  const trimText = text.trim();
  console.log(trimText);
  const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\-\.\_\s]+$/;
  console.log(regex.test(trimText));
  return regex.test(trimText);
};
