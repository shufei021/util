/*
 * @Description: 工具库打包配置文件
 */
import babel from 'rollup-plugin-babel' // Babel它能够帮助我们转译 JavaScript 新特性(ES6/ES2015 等)到 ES5 版本，这也将支持目前所有的浏览器来正常运行代码。https://www.tensweets.com/article/5bf1142c33ee9a05197f0bc1
import resolve from 'rollup-plugin-node-resolve' //可以看出不配置的话引入路径必须是完整的。帮助 Rollup 查找外部模块
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify' // 压缩
import requireContext from 'rollup-plugin-require-context'
import define from 'rollup-plugin-define';
const packageVersion = require('./package.json').version

const fs = require('fs')
const path = require('path')
const lib = path.resolve(__dirname, './src/lib')
const files = fs.readdirSync(lib)
const plugin = path.resolve(__dirname, './src/plugin')
const filesPlugin = fs.readdirSync(plugin)

const buildFile = files.reduce((p, c) => {
    !c.includes('.') && p.push({
        input: `src/lib/${c}/index.js`,
        output: {
            file: `./build/lib/${c}/index.js`,
            format: 'umd',
            name: c,
            sourcemap: false
        },
        plugins: [
            resolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            requireContext(),
            commonjs(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            uglify()
        ]
    })
    return p
}, [])


buildFile.push({
    input: `src/lib/index.js`,
    output: {
        file: `./build/lib/index.js`,
        format: 'umd',
        name: 'rutils',
        sourcemap: false
    },
    plugins: [
        define({
            replacements: {
              packageVersion:() => JSON.stringify(packageVersion),
              __buildDate__: () => JSON.stringify(new Date().toLocaleString()),
            }
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        requireContext(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        uglify()
    ]
})

const buildFilePlugin = filesPlugin.reduce((p, c) => {
    !c.includes('.') && p.push({
        input: `src/plugin/${c}/index.js`,
        output: {
            file: `./build/plugin/${c}/index.js`,
            format: 'umd',
            name: c,
            sourcemap: false
        },
        plugins: [
            resolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            requireContext(),
            commonjs(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            uglify()
        ]
    })
    return p
}, [])


buildFile.push(...buildFilePlugin)
buildFile.push({
    input: `src/plugin/index.js`,
    output: {
        file: `./build/plugin/index.js`,
        format: 'umd',
        name: 'rplugin',
        sourcemap: false
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        requireContext(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        uglify()
    ]
})


export default buildFile

/**
 * 
 * rollup-plugin-node-resolve —帮助 Rollup 查找外部模块
 * rollup-plugin-commonjs —将CommonJS模块转换为 ES2015 供 Rollup 处理
 * rollup-plugin-babel — 让我们可以使用es6新特性来编写代码
 * rollup-plugin-terser — 压缩js代码，包括es6代码压缩
 * rollup-plugin-eslint — js代码检测
 * 
 * 
 */
