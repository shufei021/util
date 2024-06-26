import { add }  from '../../src'


describe('add', () => {
  it('add(1, 2) => 3', () => {
    expect(add(1, 2)).toEqual('3')
  })
})

describe('add', () => {
  it('add(0.1, 0.2)=>0.3', () => {
    expect(add(0.1, 0.2)).toEqual('0.3')
  })
})

describe('add', () => {
  it('adds positive numbers correctly', () => {  
    expect(add(2, 3)).toEqual('5');  
  });
})

describe('add', () => {
  it('adds negative numbers correctly', () => {  
    expect(add(-2, -3)).toEqual('-5');  
  });
})
describe('add', () => {
  it('adds a positive and a negative number correctly', () => {  
    expect(add(2, -3)).toEqual('-1');  
  });
})
describe('add', () => {
  it('adds floats correctly', () => {  
    expect(add(0.1, 0.2)).toEqual('0.3')  
  });
})

describe('add', () => {
  const arr = [0.1, 0.2, 3, 4, 5, 9.12345]
  it('累加', () => {  
    expect(add(arr)).toEqual('21.42345')  
  });
})

