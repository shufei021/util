import { round }  from '../../src'
describe('round', () => {
    it("round(11) => '11'", () => {
        expect(round(11)).toEqual('11')
    })
})
describe('round', () => {
    it("round(11,2) => '11.00'", () => {
        expect(round(11,2)).toEqual('11.00')
    })
})
describe('round', () => {
    it("round(1e20) => '100000000000000000000'", () => {
        expect(round(1e20)).toEqual('100000000000000000000')
    })
})
describe('round', () => {
    it("round(1.222e50) => '122200000000000000000000000000000000000000000000000'", () => {
        expect(round(1.222e50)).toEqual('122200000000000000000000000000000000000000000000000')
    })
})
describe('round', () => {
    it("round(1.222e-20) => '0.00000000000000000001222'", () => {
        expect(round(1.222e-20)).toEqual('0.00000000000000000001222')
    })
})
describe('round', () => {
    it("round(123.456) => '123.456'", () => {
        expect(round(123.456)).toEqual('123.456')
    })
})
describe('round', () => {
    it("round(123.456, 0) => '123'", () => {
        expect(round(123.456, 0)).toEqual('123')
    })
})
describe('round', () => {
    it("round(123.456, 1) => 123.5", () => {
        expect(round(123.456, 1)).toEqual(123.5)
    })
})
describe('round', () => {
    it("round(123.456, 2) => 123.46", () => {
        expect(round(123.456, 2)).toEqual(123.46)
    })
})
describe('round', () => {
    it("round(123.456, 3) => 123.456", () => {
        expect(round(123.456, 3)).toEqual(123.456)
    })
})
describe('round', () => {
    it("round(123.456, 4) => '123.4560'", () => {
        expect(round(123.456, 4)).toEqual('123.4560')
    })
})
describe('round', () => {
    it("round(123.456, 5) => '123.45600'", () => {
        expect(round(123.456, 5)).toEqual('123.45600')
    })
})
describe('round', () => {
    it("round(1e-8) => '0.00000001'", () => {
        expect(round(1e-8)).toEqual('0.00000001')
    })
})
describe('round', () => {
    it("round(1E-8) => '0.00000001'", () => {
        expect(round('1E-8')).toEqual('0.00000001')
    })
})
describe('round', () => {
    it("round(1.23e5) => '123000'", () => {
        expect(round('1.23e5')).toEqual('123000')
    })
})
describe('round', () => {
    it("round(1.23e5,1) => '123000.0'", () => {
        expect(round(1.23e5,1)).toEqual('123000.0')
    })
})
describe('round', () => {
    it("round('1.23e5',2) => '123000.00'", () => {
        expect(round('1.23e5',2)).toEqual('123000.00')
    })
})
describe('round', () => {
    it("round('1.23e5',2) => '123000.00'", () => {
        expect(round('1.23e5',2)).toEqual('123000.00')
    })
})
describe('round', () => {
    it("round(1.234567891234567e-16,20) => '0.00000000000000012346'", () => {
        expect(round(1.234567891234567e-16,20)).toEqual('0.00000000000000012346')
    })
})
describe('round', () => {
    it("round(123e+25,20) => '1230000000000000000000000000.00000000000000000000'", () => {
        expect(round(123e+25,20)).toEqual('1230000000000000000000000000.00000000000000000000')
    })
})

// 测试正常四舍五入

describe('round', () => {
    it("round(3.14159, 2) => 3.14", () => {
        expect(round(3.14159, 2)).toEqual(3.14)
    })
})
describe('round', () => {
    it("round(10.567, 1) => 10.6", () => {
        expect(round(10.567, 1)).toEqual(10.6)
    })
})
describe('round', () => {
    it("round(123.456, 0) => '123'", () => {
        expect(round(123.456, 0)).toEqual('123')
    })
})




// 测试负数的情况
describe('round', () => {
    it("round(-3.14159, 2) => -3.14", () => {
        expect(round(-3.14159, 2)).toEqual(-3.14)
    })
})
describe('round', () => {
    it("round(-10.567, 1) => -10.6", () => {
        expect(round(-10.567, 1)).toEqual(-10.6)
    })
})
describe('round', () => {
    it("round(-123.456, 0) => '-123'", () => {
        expect(round(-123.456, 0)).toEqual('-123')
    })
})

// 测试不同位数的四舍五入
describe('round', () => {
    it("round(1234.5678, 3) => 1234.568", () => {
        expect(round(1234.5678, 3)).toEqual(1234.568)
    })
})
describe('round', () => {
    it("round(987.654321, 5) => 987.65432", () => {
        expect(round(987.654321, 5)).toEqual(987.65432)
    })
})

// 测试未提供要四舍五入到的位数的情况
describe('round', () => {
    it("round(3.14159) => '3.14159'", () => {
        expect(round(3.14159)).toEqual('3.14159')
    })
})
describe('round', () => {
    it("round(100) => '100'", () => {
        expect(round(100)).toEqual('100')
    })
})
// 测试非数字输入的情况：
describe('round', () => {
    it("round('abc', 2) => 'NaN'", () => {
        expect(round('abc', 2)).toEqual('NaN')
    })
})
describe('round', () => {
    it("round(NaN, 2) => 'NaN'", () => {
        expect(round(NaN, 2)).toEqual('NaN')
    })
})
describe('round', () => {
    it("round(undefined, 2) => 'NaN'", () => {
        expect(round(undefined, 2)).toEqual('NaN')
    })
})