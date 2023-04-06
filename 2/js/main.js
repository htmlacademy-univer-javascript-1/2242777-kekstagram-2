const getRandomInt(from, to) => {
  if (from < 0 || to <0){
  return ('Числа в диапазоне должны быть положительные!');
  }
  if (from>to){
    [from,to] = [to,from]
  }
  return Math.round(Math.random()*(from - to) + to);
}


const checkLength (str, maxLength) => str.length <= maxLength
