/*
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2021-09-27 15:53:37
 * @LastEditors: chenx
 * @LastEditTime: 2021-10-16 17:58:43
 */
/*
 * @Author: chenx
 * @Descripttion: 
 * @Date: 2021-04-13 10:05:44
 * @LastEditors: chenx
 * @LastEditTime: 2021-09-27 16:07:11
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        resolveStyle: (name) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }]
    }),
  ],
  resolve: {
    alias: [
      { find: '/@', replacement: path.resolve(__dirname, 'src') }
    ],
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    strictPort: false,//如果端口占用，是退出，还是尝试其他端口
    https: false,// 是否开启 https
    proxy: {
      '/api': {
        // 替换为本机IP
        target: 'http://139.129.101.158:21009',
        changeOrigin: true,
      },
      // '/api': {
      //   target: 'http://39.97.254.142:2888',
      //   changeOrigin: true,
      // },
    },

  },
  build: {
    assetsInlineLimit:0,
    // assetsDir:"assets",
    // rollupOptions: {
    //   external: ['vue', 'vuetify'],
    //   output: {
    //     assetFileNames: 'assets/[ext]/[name].[ext]',
    //     entryFileNames: 'assets/js/[name].js',
    //     chunkFileNames: 'assets/js/[name].js'
    //   }
    // }
  }
})
