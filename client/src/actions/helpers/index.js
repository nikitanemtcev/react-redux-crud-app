export default (array, inputElement) => {
  let isInArray = false;

  array.forEach((element) => {
    if (element === inputElement) {
      isInArray = true;
    }
  });

  return isInArray;
};
