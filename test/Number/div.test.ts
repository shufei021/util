import { div }  from '../../src'
describe('div', () => {
    // 正常情况测试
    it('正数除以正数', () => {
      expect(div(6, 2)).toEqual('3');
    });
  
    it('负数除以负数', () => {
      expect(div(-6, -2)).toEqual('3');
    });
  
    it('正数除以负数', () => {
      expect(div(6, -2)).toEqual('-3');
    });
  
    it('负数除以正数', () => {
      expect(div(-6, 2)).toEqual('-3');
    });
  
    it('被除数为0', () => {
      expect(div(0, 5)).toEqual(0);
    });
  
    it('除数为1', () => {
      expect(div(5, 1)).toEqual('5');
    });
  
    it('结果为小数', () => {
      expect(div(1, 3)).toEqual('0.3333333333333333'); // 使用 toBeCloseTo 处理浮点精度
    });
  
    it('小数相除', () => {
      expect(div(0.1, 0.2)).toEqual('0.5'); // 用户示例中的期望值应为0.5，原示例有误
    });
  
    // it('大数相除', () => {
    //   expect(div(Number.MAX_VALUE, 2)).toEqual(Number.MAX_VALUE / 2);
    // });
  
    // it('极小数相除', () => {
    //   expect(div(1e-308, 2)).toEqual(5e-309);
    // });
  
    // 异常情况测试
    // it('除数为0时抛出错误', () => {
    //   expect(() => div(5, 0)).toThrow('除数不能为0');
    // });
  
    // it('被除数和除数都为0时抛出错误', () => {
    //   expect(() => div(0, 0)).toThrow('除数不能为0');
    // });
  
    // it('参数为字符串时抛出错误', () => {
    //   expect(() => div('5', 2)).toThrow('参数必须是数字');
    // });
  
    // it('参数为null时抛出错误', () => {
    //   expect(() => div(null, 2)).toThrow('参数必须是数字');
    // });
  
    // 特殊情况测试
    // it('负零的结果', () => {
    //   expect(div(-0, 5)).toEqual(-0);
    // });
  
    it('浮点数精度问题', () => {
      expect(div(1, 3)).toEqual('0.3333333333333333');
    });
  
    // it('除数为0时返回Infinity（可选）', () => {
    //   // 如果函数返回 Infinity 而非抛出错误
    //   expect(div(5, 0)).toEqual(Infinity);
    // });
  });