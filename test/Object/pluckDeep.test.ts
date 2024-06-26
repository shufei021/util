import { pluckDeep }  from '../../src'


describe('pluckDeep', () => {
  it('正常使用场景', () => {
    const obj = {
        person: {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                zipCode: '10001'
            }
        }
    };
    expect(pluckDeep('person.name')(obj)).toEqual('John')
  })
})
describe('pluckDeep', () => {
    it('属性不存在的情况', () => {
      const obj = {
          person: {
              name: 'John',
              age: 30,
              address: {
                  city: 'New York',
                  zipCode: '10001'
              }
          }
      };
      expect(pluckDeep('person.alstname')(obj)).toEqual(undefined)
    })
})
describe('pluckDeep', () => {
    it('对象为空的情况', () => {
        const obj = null;
        expect( pluckDeep('person.name')(obj)).toEqual(undefined)
        expect( pluckDeep('person.name')(obj, '默认值')).toEqual('默认值')
    })
})
describe('pluckDeep', () => {
    it('对象为数字的情况', () => {
        const obj = 0;
        expect( pluckDeep('person.name')(obj)).toEqual(undefined)
        expect( pluckDeep('person.name')(obj, '默认值')).toEqual('默认值')
    })
})

describe('pluckDeep', () => {
    it('单层属性提取', () => {
        const arr = [{ name: 'Alice' }, { name: 'Bob' }];
        expect(pluckDeep('0.name')(arr)).toEqual('Alice')
        expect(pluckDeep('0.name1')(arr, '默认值')).toEqual('默认值')
    })
})
describe('pluckDeep', () => {
    it('空数组 & 空对象', () => {
        const emptyArr:any[] = [];
        const emptyObj:object = {};
        expect(pluckDeep('0.a.b.c')(emptyArr)).toEqual(undefined)
        expect(pluckDeep('1.a.b.c')(emptyObj)).toEqual(undefined)
        expect(pluckDeep('0.a.b.c1')(emptyArr, '默认值')).toEqual('默认值')
        expect(pluckDeep('1.a.b.c1')(emptyObj, '默认值')).toEqual('默认值')
    })
})