class Num {
    private a:number | string = 0
    constructor(a: number | string) {
        // 初始化计算器，如果没有提供初始值，则默认为0
        this.a = a || 0;
    }
    // 四舍五入到指定位数
    round(dight?: number) {
        // 将输入的数字转换为字符串
        let n: any = Number(this.a).toString();
        // 结果
        let result = n;
        // 如果是科学计数法
        if (n.includes('e')) {
            // 分离系数和指数
            let [coefficient, exponent]:any[] = n.split('e');
    
            // 如果系数是小数进行抹平
            if (coefficient.includes('.')) {
                const arr = coefficient.split('.');
                const dotLen = arr[1].length;
                exponent = exponent - dotLen;
                coefficient = coefficient.replace('.', '');
            }
    
            // 处理指数大于0的情况（整数部分）
            if (exponent > 0) {
                // 构造补零部分
                const end = '0'.repeat(exponent);
                // 合并系数和补零部分
                const rt = coefficient + end;
                // 如果指定保留小数位数，则返回带小数的结果
                if (dight)  {
                    result = rt + '.' + '0'.repeat(dight)
                } else if (exponent > coefficient.length || dight === undefined)  { //  // 如果补零位数大于系数位数，直接返回结果
                    result = rt 
                } else{  // 补零位数小于等于系数位数，截取结果 
                    result = (rt + '0'.repeat(dight)).slice(0, -1 * dight);
                }
            } else if (exponent < 0) { // 处理指数小于0的情况（小数部分）
                // 补零形成小数
                n = '0.' + coefficient.padStart(-exponent, 0);
                // 如果未指定小数位数，直接返回结果
                if (dight === undefined) {
                    result = n;
                } else{
                    // 四舍五入
                    const r = (Math.round(n * 10 ** exponent / (10 ** (exponent - dight))) / 10 ** dight).toString();
                    // 处理科学计数法结果
                    if (r.includes('e')) {
                        let [coefficient, exponent]:any[] = r.split('e'); 
                        if (coefficient.includes('.')) {
                            const arr = coefficient.split('.');
                            const dotLen = arr[1].length;
                            exponent = exponent - dotLen;
                            coefficient = coefficient.replace('.', '');
                        }
                        // 返回补零形成的小数
                        result = '0.' + coefficient.padStart(-exponent, 0);
                    } else {
                        // 返回四舍五入后的结果
                        result = r;
                    }
                }
            }
        } else { // 非科学计数法
            if (n.includes('.')) { // 处理小数
                // 如果未指定小数位数，直接返回结果
                if (dight === undefined) {
                    this.a = n
                    return this
                }
                const arr = n.split('.');
                let dotLen = arr[1].length;
                // 补零保留小数位数
                if (dight > dotLen) {
                    result = n.padEnd(n.length + dight - dotLen, '0');
                } else if (dight === undefined){  // 如果未指定小数位数，直接返回结果 
                    result = n;
                } else { // 四舍五入
                    const r = Math.round((n * (10 ** dotLen)) / (10 ** (dotLen - dight))) / (10 ** dight);
                    if(Number.isInteger(r)){
                        result = r.toFixed(dight);
                    } else{
                        result = r
                    }
                }
            } else { // 处理整数
                // 保留小数位数
                result =  Number(n).toFixed(dight);
            }
        }
        // 更新计算器的值
        this.a = result;
        return this;
    }
   
    // 计算函数
    calc(type:number, a: number=0, b: number=0, digit?:number) {
        // 获取 a 和 b 的小数位数
        const aLen = a.toString().split('.')[1]?.length || 0;
        const bLen = b.toString().split('.')[1]?.length || 0;
        // 计算最大位数，用于保留计算结果的精度
        let maxLen = Math.pow(10, Math.max(aLen, bLen));
        // 检查计算类型是否合法
        if (![0, 1, 2, 3].includes(type)) throw new Error('type参数错误');
        // 根据计算类型进行相应的运算
        const result = type === 0 ? 
                        (a * maxLen + b * maxLen) / maxLen : type === 1 ? 
                        (a * maxLen - b * maxLen) / maxLen : type === 2 ?  
                        (a * maxLen) * (b * maxLen) / (maxLen * maxLen) : 
                        (a * maxLen) / (b * maxLen);
        // 调用四舍五入函数对结果进行精度控制
        this.a = result
        return this.round(digit).toValue();
    }
    
    // 加法
    add(b: number | string, digit?:number) {
        let a = this.a
        // 如果 a 是数组，则递归处理多个数的加法
        if(Array.isArray(b)){
            this.a =  b.length ? b.reduce((p: number | string, c: number | string) => (this.add(c, digit),this.a), a) : a
        } else{
            this.a =  this.calc(0, Number(a), Number(b), digit);
        }
        return this
    }

    // 减法
    sub (b: number | string, digit?:number) {
        let a = this.a
        // 如果 a 是数组，则递归处理多个数的减法
        if( Array.isArray(b)){
            this.a =  b.length ? b.reduce((p: number | string, c: number | string) => (this.sub(c, digit),this.a),a) : a
        } else{
            this.a =  this.calc(1, Number(a), Number(b), digit);
        }
        return this
    }

    // 乘法
    mul (b: number | string, digit?:number) {
        let a = this.a
        // 如果 a 是数组，则递归处理多个数的乘法
        if(Array.isArray(b)){
            this.a = b.length ? b.reduce((p, c) => (this.mul(c, digit),this.a), a) : a
        } else{
            this.a = this.calc(2, Number(a), Number(b), digit);
        }
       
        return this
    }

    // 除法
    div (b: number | string, digit?:number) {
        let a = this.a
        // 如果 a 是数组，则递归处理多个数的除法
        if(Array.isArray(b)){
            if(!a){
                this.a = 0
            } else{
                this.a = b.length ? b.reduce((p, c) => (this.div(c, digit),this.a),a) : a
            }
        } else{
            if(!a || !b ){
                this.a = 0
            } else{
                this.a = this.calc(3, Number(a), Number(b), digit);
            }
        }
      
        return this
    }
    // 获取当前值
    toValue () {
        return this.a;
    }
}



export const num: Function = function (a:number | string):object{
    return new Num(a)
}