import { range } from '../../src';
import { isRepeat } from '../../src';

describe('range', () => {
  it('生产 范围内 的数组', () => {
    expect(range(0,10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(range(1,9)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(isRepeat(range(1,9,7))).toEqual(false);
    expect(isRepeat(range(0,10,9,true))).toEqual(true);
  });
});
