/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-03-14 10:51:53
 * @LastEditors: chenx
 * @LastEditTime: 2022-04-22 18:30:14
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
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      vue: 'https://esm.sh/vue@3.2.33',
      '@': path.resolve(__dirname, '/src'),
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
    fs: {
      // 默认： false (将在后续版本中改为 true)
      // 限制为工作区 root 路径以外的文件的访问。
      strict: false,
    },
  },
  build: {
    target: 'es2015',
    assetsInlineLimit: 0,
    assetsDir: 'assets',
    rollupOptions: {
      external: ['vue', 'vuetify', 'element-plus'],
      // output: {
      //   chunkFileNames: 'assets/js/[name]-[hash].js',
      //   entryFileNames: 'assets/js/[name]-[hash].js',
      //   assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      // },
    },
  },
}
export default defineConfig(config)
