export const objectsEqual = (first, second) => {
  if (Object.keys(first).some((key) => first[key] !== second[key])) {
    return false;
  }
  return true;
};

const getTwoDigitString = (n) => (n < 10 ? `0${n}` : `${n}`);

export const getDateInputString = (day, month, year) => `${year}-${getTwoDigitString(month)}-${getTwoDigitString(day)}`;
