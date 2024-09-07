export const checkTitle = (text: string): boolean => {
  const trimText = text.trim();
  const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\-._\s]+$/;
  return regex.test(trimText);
};
