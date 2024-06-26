import { deepClone }  from '../../src'


describe('deepClone', () => {
  it('深克隆函数', () => {
    const fn = function (a:any,b:any){
      return a+b
    }
    expect(deepClone(fn) === fn).toEqual(false)
  })
})
describe('deepClone', () => {
  it('深克隆正则', () => {
    const reg = /\d+/g
    const reg1 = deepClone(reg)
    expect(reg === reg1).toEqual(false)
  })
})
describe('deepClone', () => {
  it('深克隆日期', () => {
    const reg = /\d+/g
    const reg1 = deepClone(reg)
    expect(reg === reg1).toEqual(false)
  })
})
describe('deepClone', () => {
  it('基本类型', () => {
    const original = 42;  
    const cloned = deepClone(original);  
    expect(cloned).toBe(original);
  })
})

describe('deepClone', () => {
  it('对象', () => {
    const original = { a: 1, b: 2 };  
    const cloned = deepClone(original);  
    expect(cloned).toEqual(original);  
    expect(cloned).not.toBe(original);
  })
})
describe('deepClone', () => {
  it('数组', () => {
    const original = [1, 2, 3];  
    const cloned = deepClone(original);  
    expect(cloned).toEqual(original);  
    expect(cloned).not.toBe(original);
  })
})
describe('deepClone', () => {
  it('嵌套对象', () => {
    const original = { a: 1, b: { c: 2,d: function(a:number,b:number):number { return a+b},f:{j:/\d+/g, k:{l:[1,2,3],p:new Date()}} } };  
    const cloned = deepClone(original);  
    expect(cloned).not.toBe(original);  
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.b.d).not.toBe(original.b.d);
    expect(cloned.b.f.j).not.toBe(original.b.f.j);
    expect(cloned.b.f.k).not.toBe(original.b.f.k);
    expect(cloned.b.f.k.l).not.toBe(original.b.f.k.l);
    expect(cloned.b.f.k.p).not.toBe(original.b.f.k.p);  
    expect(cloned.b.d(1,2)).toEqual(original.b.d(1,2));
  })
})
describe('deepClone', () => {
  it('嵌套对象', () => {
    const original = [1, [2, 3]];  
    const cloned = deepClone(original);  
    expect(cloned).toEqual(original);  
    expect(cloned).not.toBe(original);  
    expect(cloned[1]).not.toBe(original[1]);
  })
})
describe('deepClone', () => {
  it('函数和特殊对象', () => {
    const original = { a: 1, b: function() {} };  
    const cloned = deepClone(original);  
    expect(cloned.a).toBe(1);  
    expect(cloned.b).not.toBe(original.b);
  })
})
describe('deepClone', () => {
  it('循环引用', () => {
    const original:{[a:string]:any} = {};  
    original.a = original;  
    const cloned = deepClone(original);  
    expect(cloned.a).not.toBe(original);  
    expect(cloned.a.a).toBe(cloned.a);
  })
})