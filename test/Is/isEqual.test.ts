import { isEqual } from '../../src';

describe('isEqual', () => {
  it('对象判断', () => {
    const obj = { a: 1, b: 0, c: null, d: 99, e: [], f: {}, j: '', k: false };
    expect(isEqual(obj,{ a: 1, b: 0, c: null, d: 99, e: [], f: {}, j: '', k: false })).toEqual(true);
    expect(isEqual(obj,{ a: 1, b: 0, c: null, d: 99, e: [], f: {}, j: '1', k: false })).toEqual(false);

    expect(isEqual(null,null)).toEqual(true);
    expect(isEqual(undefined,undefined)).toEqual(true);
    expect(isEqual(0,0)).toEqual(true);
    expect(isEqual(1,1)).toEqual(true);
    expect(isEqual(false,false)).toEqual(true);
    expect(isEqual(true,true)).toEqual(true);
    expect(isEqual([],[])).toEqual(true);
    expect(isEqual({},{})).toEqual(true);
  });
});

describe('isEqual', () => {
    it('原始值比较', () => {
        expect(isEqual("hello", "hello")).toBe(true)
        expect(isEqual(123, 123)).toBe(true);
        expect(isEqual(true, true)).toBe(true);  
        expect(isEqual(false, false)).toBe(true);
        expect(isEqual("123", 123)).toBe(false); // 字符串和数字不相等
    });
});

describe('isEqual', () => {
    it('对象比较', () => {
        expect(isEqual({}, {})).toBe(true);
        const obj1 = { a: 1, b: "two" };  
        const obj2 = { a: 1, b: "two" };  
        expect(isEqual(obj1, obj2)).toBe(true);
        const obj3 = { b: "two", a: 1 };  
        expect(isEqual(obj1, obj3)).toBe(true); // 假设 isEqual 不考虑属性顺序
        const obj4 = { a: 1, b: "two", c: 3 };  
        expect(isEqual(obj1, obj4)).toBe(false);
        const obj5 = { a: 1, b: { c: "three" } };  
        const obj6 = { a: 1, b: { c: "three" } };  
        expect(isEqual(obj5, obj6)).toBe(true);

    });
});
describe('isEqual', () => {
    it('基本对象比较', () => {
        const obj1 = { key: 1, value: 'value' };  
        const obj2 = { key: 1, value: 'value' };  
        expect(isEqual(obj1, obj2)).toBe(true);
        const obj3 = { value: 'value', key: 1 };  
        expect(isEqual(obj1, obj3)).toBe(true);
    });
});
describe('isEqual', () => {
    it('嵌套对象比较', () => {
        const obj4 = { key: 1, nested: { value: 'nestedValue' } };  
        const obj5 = { key: 1, nested: { value: 'nestedValue' } };  
        expect(isEqual(obj4, obj5)).toBe(true);
        const obj6 = { key: 1, nested: { value: 'nestedValue', extra: 'extraValue' } };  
        expect(isEqual(obj4, obj6)).toBe(false);
    });
});
describe('isEqual', () => {
    it('数组与对象混合比较', () => {
        const obj7 = { key: 1, arr: [1, 2, 3] };  
        const obj8 = { key: 1, arr: [1, 2, 3] };  
        expect(isEqual(obj7, obj8)).toBe(true);
        const obj9 = { arr: [{ key: 1, value: 'value' }] };  
        const obj10 = { arr: [{ key: 1, value: 'value' }] };  
        expect(isEqual(obj9, obj10)).toBe(true);
    });
});
describe('isEqual', () => {
    it('数组比较', () => {
        expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false); 
        expect(isEqual([[1, 2], [3, 4]], [[1, 2], [3, 4]])).toBe(true);
    });
});

describe('isEqual', () => {
    it('特殊值比较', () => {
        expect(isEqual(null, undefined)).toBe(false);
        expect(isEqual(NaN, NaN)).toBe(true); 
    });
});

describe('isEqual', () => {
    it(' 引用比较', () => {
        const ref = {};  
        expect(isEqual(ref, ref)).toBe(true);
        const obj7 = { a: 1 };  
        const obj8 = { a: 1 };  
        expect(isEqual(obj7, obj8)).toBe(true); // 假设 isEqual 执行深度比较
        const obj11:{[key: string]: any} = { ref: null };  
        obj11.ref = obj11;  
        const obj12:{[key: string]: any}= { ref: null };  
        obj12.ref = obj12;  
        expect(isEqual(obj11, obj12)).toBe(true);
        const func1 = function() {};  
        const func2 = function() {};  
        expect(isEqual(func1, func2)).toBe(false); // 假设不比较函数内容
    });
});

describe('isEqual', () => {
    it('日期对象比较', () => {
        const date1 = new Date(2024, 5, 21); // 注意月份从0开始  
        const date2 = new Date(2024, 5, 21);  
        expect(isEqual(date1, date2)).toBe(true); // 假设isEqual比较日期值
    });
});

