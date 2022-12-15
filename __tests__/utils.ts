import { describe, expect, test } from '@jest/globals';
import exp from 'constants';
import { getRandomInt, getRandomUniqIntArray } from 'utils/randoms';

describe('get random integer', () => {
  test('if return integer', () => {
    expect(Number.isInteger(getRandomInt(0, 10))).toBe(true);
  });
  test('to throw ex if args < 0 or min > max', () => {
    expect(() => getRandomInt(-1, 10)).toThrow('wrong args');
    expect(() => getRandomInt(1, -10)).toThrow('wrong args');
    expect(() => getRandomInt(-1, -10)).toThrow('wrong args');
    expect(() => getRandomInt(10, 5)).toThrow('wrong args');
  });
  test('if return fixed number', () => {
    expect(getRandomInt(1, 1)).toBe(1);
    expect(getRandomInt(10, 10)).toBe(10);
    expect(getRandomInt(100, 100)).toBe(100);
  });
  test('if return within range', () => {
    expect(getRandomInt(5, 10)).toBeLessThanOrEqual(10);
    expect(getRandomInt(15, 100)).toBeGreaterThanOrEqual(15);
  });
});

describe('get array of random integers', () => {
  test('if arguments acceptable', () => {
    expect(() => getRandomUniqIntArray(0, 10, 0)).toThrow('Length could not be less then 1');
    expect(() => getRandomUniqIntArray(0, 0, 1)).toThrow(
      'Max number could not be less than 1',
    );
    expect(() => getRandomUniqIntArray(-1, 5, 5)).toThrow('Min could not be negative');
    expect(() => getRandomUniqIntArray(0, 6, 8)).toThrow(
      'Length could not be greater than max',
    );
    expect(() => getRandomUniqIntArray(5, 5, 2)).toThrow(
      'Length could not be more than max - min + 1',
    );
  });
  test('if return array', () => {
    expect(Array.isArray(getRandomUniqIntArray(0, 1, 1))).toBe(true);
  });
  test('if return array of requiered length', () => {
    expect(getRandomUniqIntArray(5, 5, 1).length).toBe(1);
    expect(getRandomUniqIntArray(4, 5, 2).length).toBe(2);
    expect(getRandomUniqIntArray(0, 10, 10).length).toBe(10);
    expect(getRandomUniqIntArray(0, 10, 5).length).toBe(5);
    expect(getRandomUniqIntArray(0, 100, 75).length).toBe(75);
  });

  test('if numbers in array are in limits', () => {
    const randomNumbers0 = getRandomUniqIntArray(0, 1, 2);
    expect(randomNumbers0.length).toBe(2);
    expect(randomNumbers0[0] !== randomNumbers0[1]).toBe(true);

    const minLimit1 = 5;
    const maxLimit1 = 10;
    const randomNumbers1 = getRandomUniqIntArray(minLimit1, maxLimit1, 3);
    const sorted1 = randomNumbers1.sort((a, b) => a - b);
    const min1 = sorted1[0];
    const max1 = sorted1[sorted1.length - 1];
    expect(min1).toBeGreaterThanOrEqual(minLimit1);
    expect(max1).toBeLessThanOrEqual(maxLimit1);

    const minLimit2 = 23;
    const maxLimit2 = 145;
    const randomNumbers2 = getRandomUniqIntArray(minLimit2, maxLimit2, 35);
    const sorted2 = randomNumbers2.sort((a, b) => a - b);
    const min2 = sorted2[0];
    const max2 = sorted2[sorted2.length - 1];
    expect(min2).toBeGreaterThanOrEqual(minLimit2);
    expect(max2).toBeLessThanOrEqual(maxLimit2);
  });

  test('if numbers in array are unique', () => {
    const randomNumbers3 = getRandomUniqIntArray(10, 50, 10);
    const uniqueNumbers = new Set([...randomNumbers3]);
    expect(uniqueNumbers.size === randomNumbers3.length).toBe(true);
  });
});
