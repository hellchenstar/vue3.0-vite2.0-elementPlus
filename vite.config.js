/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-03-14 10:51:53
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-28 17:58:31
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const path = require('path')
// https://vitejs.dev/config/
const config = {
  base: './',
  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: false,
      imports: [
        'vue',
        'vue-router',
        {
          axios: [
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ], // 配置这个可以忽略.vue文件中需要手动引入ref,reactive等vue自带api,这里会处理成自动引入
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      //配置别名
      '@': path.resolve(__dirname, 'src'),
      vue: 'https://cdn.jsdelivr.net/npm/vue@next/+esm',
      axios: 'https://cdn.jsdelivr.net/npm/axios@next/+esm',
      'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@next/+esm',
      'element-plus': 'https://cdn.jsdelivr.net/npm/element-plus',
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    strictPort: false, //如果端口占用，是退出，还是尝试其他端口
    https: false, // 是否开启 https
    proxy: {
      // 远端服务
      // '/api': {
      //   target: 'http://139.129.101.158:21009',
      //   changeOrigin: true,
      // },
      // 本地服务
      '/api': {
        target: 'http://127.0.0.1:21009/',
        changeOrigin: true,
      },
    },
  },
  build: {
    //浏览器兼容性  "esnext"|"modules"
    target: 'modules',
    //指定输出路径
    outDir: 'dist',
    //生成静态资源的存放路径
    // assetsDir: "assets",
    assetsDir: 'assets',
    //@rollup/plugin-commonjs 插件的选项
    commonjsOptions: {},
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
}
export default defineConfig(config)
