import { attrFilter } from '../../src';

describe('attrFilter', () => {
  it('对象属性值过滤', () => {
    const obj = { a: 1, b: 0, c: null, d: 99, e: [], f: {}, j: '', k: false };
    expect(attrFilter(obj)).toEqual(obj);
    expect(attrFilter(obj,{ isEmptyZero:true, isEmptyObject:true, isEmptyArray:true, isNull:true, isFalse:true, isEmptyString:true })).toEqual({ a:1, d:99 });
    expect(attrFilter(obj,{ isEmptyObject:true, isEmptyArray:true, isNull:true, isFalse:true, isEmptyString:true})).toEqual({a:1, b: 0,d:99});
    expect(attrFilter(obj,{ isEmptyArray:true, isNull:true, isFalse:true, isEmptyString:true})).toEqual({a:1, b: 0, d:99, f: {}});
    expect(attrFilter(obj,{ isNull:true, isFalse:true, isEmptyString:true})).toEqual({a:1, b: 0,d:99, e: [],f: {}});
    expect(attrFilter(obj,{ isFalse:true, isEmptyString:true })).toEqual({a:1, b: 0,c: null, d:99, e: [],f: {}});
    expect(attrFilter(obj,{ isEmptyString:true })).toEqual({a:1, b: 0,c: null, d:99, e: [],f: {}, k: false});
    expect(attrFilter(obj,{})).toEqual({ a: 1, b: 0, c: null, d: 99, e: [], f: {}, j: '', k: false });
  });
});
