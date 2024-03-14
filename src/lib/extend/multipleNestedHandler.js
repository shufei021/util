/*
 * @Author: your name
 * @Date: 2021-10-12 15:23:14
 * @LastEditTime: 2021-10-26 21:22:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \util\src\lib\extend\multipleNestedHandler.js
 */

export default function multipleNestedHandler(strategy, opt){
    let action = strategy.find(([key]) => Object.keys(opt.methods).every(k => opt.methods[k](opt.state[k]) === key[k]) && opt.cb && opt.cb(key))
    action ? action[1]() : opt.other && opt.other()
}

/**
 * 
 * 
const orderType = 1 // 1: 美妆，2：电器，3：家具
const orderWay = 1 // 1：h5，2：app，3：小程序
const orderMoney = 100 // 金额范围划分，0-100，100-1000，1000以上，跳转的订单详情也不相同

if (orderType === 1) {
    if (orderWay === 1) {
        if (0 <= orderMoney && orderMoney < 100) {
            console.log('美妆订单h5-0')
        } else if (orderMoney < 1000) {
            console.log('美妆订单h5-100')
        } else {
            console.log('美妆订单h5-1000')
            
        }
    } else if (orderWay === 2) {
        if (0 <= orderMoney && orderMoney < 100) {
            console.log('美妆订单app-0')
        } else if (orderMoney < 1000) {
            console.log('美妆订单app-100')
        } else {
            console.log('美妆订单app-1000')
        }
    } else if (orderWay === 3) {
        if (0 <= orderMoney && orderMoney < 100) {
            console.log('美妆订单小程序-0')
        } else if (orderMoney < 1000) {
            console.log('美妆订单小程序-100')
        } else {
            console.log('美妆订单小程序-1000')
        }
    }
} // 条件判断次数太多，所以此处只用了一层条件
 * 
 * 
 * 
 * 
 */




/**
 * 
const orderType = 1 // 1: 美妆，2：电器，3：家具
const orderWay = 1 // 1：h5，2：app，3：小程序
const orderMoney = 500 // 金额范围划分，0-100，100-1000，1000以上，跳转的订单详情也不相同
// 订单类型+环境类型策略
const strategy = [
    [
        {
            orderType: 1,
            orderWay: 1,
            orderMoney: 1
        },
        () => {
            console.log('美妆订单h5-0')
        }
    ],
    [
        {
            orderType: 1,
            orderWay: 1,
            orderMoney: 2
        },
        () => {
            console.log('美妆订单h5-100')
        }
    ],
    [
        {
            orderType: 1,
            orderWay: 1,
            orderMoney: 3
        },
        () => {
            console.log('美妆订单h5-1000')
        }
    ]
]

const multipleNestedHandler = (strategy, opt) => {
    let action = strategy.find(([key]) => Object.keys(opt.methods).every(k => opt.methods[k](opt.state[k]) === key[k]) && opt.cb && opt.cb(key))
    action ? action[1]() : opt.other && opt.other()
}

multipleNestedHandler(strategy, {
    cb(key) {
        console.log(key, 'KEY')
        return key.orderType === orderType && key.orderWay === orderWay
    },
    state: {
        orderMoney: orderMoney
    },
    methods: {
        orderMoney(orderMoney) {
            // 提取金额策略
            if (0 <= orderMoney && orderMoney < 100) {
                return 1
            } else if (orderMoney < 1000) {
                return 2
            }
            return 3
        }
    }
}) 
 * 
 */