/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-03-25 16:33:01
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-28 16:46:04
 */
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true, // 指定为根配置，防止有上级的 eslint 继续向上查找配置文件
  extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    // 自己配置的规则
    'import/no-absolute-path': [0], // 关闭不能使用绝对路径导入模块
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 'off',
    'no-alert': 0, //禁止使用alert confirm prompt
    'vue/html-indent': [
      'error',
      2,
      {
        baseIndent: 1,
      },
    ],
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-empty': 2, //块语句中的内容不能为空
    'no-eq-null': 2, //禁止对null使用==或!=运算符
    // "no-floating-decimal": 2,//禁止省略浮点数中的0 .5
    'no-implicit-coercion': 1, //禁止隐式转换
    'no-multi-spaces': 1, //不能用多余的空格
    'no-nested-ternary': 0, //禁止使用嵌套的三目运算
    'no-param-reassign': 2, //禁止给参数重新赋值
    'no-redeclare': 2, //禁止重复声明变量
    'no-mixed-spaces-and-tabs': 0, //禁止混用tab和空格
    'no-trailing-spaces': 0,
    'block-scoped-var': 0, //块语句中使用var
    camelcase: 0, //强制驼峰法命名
    eqeqeq: 2, //必须使用全等
    indent: [2, 2], //缩进风格
    'key-spacing': [
      0,
      {
        beforeColon: false,
        afterColon: true,
      },
    ], //对象字面量中冒号的前后空格
    'max-params': [0, 5], //函数最多只能有3个参数
    'no-unused-vars': [
      2,
      {
        // 允许声明未使用变量
        vars: 'local',
        // 参数不检查
        args: 'none',
      },
    ],
    'no-undef': 1, //不能有未定义的变量
    'no-trailing-spaces': 1, //一行结束后面不要有空格
    'no-sparse-arrays': 2, //禁止稀疏数组， [1,,2]
    'no-redeclare': 2, //禁止重复声明变量
    'no-multiple-empty-lines': [1, { max: 3 }], //空行最多不能超过2行
    'no-extra-semi': 2, //禁止多余的冒号
    'block-scoped-var': 2, //禁止块语句中使用var
    strict: 2, //使用严格模式
    'vars-on-top': 2, //var必须放在作用域顶部
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // 这里写覆盖vue文件的规则
        'no-unused-vars': [0],
      },
    },
  ],
})
