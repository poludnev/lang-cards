export const getRandomInt = (min: number, max: number): number => {
  if (min < 0 || max < 0 || min > max) throw new Error('wrong args');
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomUniqIntArray = (min: number, max: number, length: number): number[] => {
  if (length < 1) throw new Error('Length could not be less then 1');
  if (max < 1) throw new Error('Max number could not be less than 1');
  if (min < 0) throw new Error('Min could not be negative');
  if (max < length - 1) throw new Error('Length could not be greater than max');
  if (length > max - min + 1) throw new Error('Length could not be more than max - min + 1');
  const numbers = [...Array(max - min + 1)].map((_, i) => i + min);

  const pickUniqueNumbers = (arr: number[], length: number, acc: number[] = []) => {
    if (arr.length === 0) return acc;
    const newArr = [...arr];
    const i = getRandomInt(0, newArr.length - 1);
    acc.push(arr[i]);
    if (acc.length === length) return acc;
    newArr.splice(i, 1);
    return pickUniqueNumbers(newArr, length, acc);
  };

  return pickUniqueNumbers(numbers, length);
};
