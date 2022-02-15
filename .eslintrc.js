/*
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2022-02-15 15:26:07
 * @LastEditors: chenx
 * @LastEditTime: 2022-02-15 16:45:50
 */
module.exports = {
  "root": true,
  "env": {   // ene 定义了一组预定义的全局变量
    "browser":true,  //浏览器环境的全局变量
      "node": true, // node 全局变量
      "es6": true // 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
  },
  "extends": ["plugin:vue/vue3-essential", "@vue/standard","prettier"],
  "parserOptions": {
      "parser": "babel-eslint"
  },
  "rules": {
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "no-console": "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    
  }
}