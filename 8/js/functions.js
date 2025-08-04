const checkStringLength = (string, length) => string.length <= length;

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

const isPalindrome = (string) => {
  const normalizeString = string.replaceAll(' ', '').toLocaleLowerCase();
  let invertedString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    invertedString += normalizeString[i];
  }
  return invertedString === normalizeString;
};

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

const getNumber = (string) => {
  string = string.toString().replaceAll(' ', '');
  let strNum = '';
  for(let i = 0; i < string.length; i++){
    strNum += !isNaN(string[i]) ? string[i] : '';
  }

  return parseInt(strNum, 10);
};

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN
getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15
