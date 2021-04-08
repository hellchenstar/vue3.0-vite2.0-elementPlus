import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
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
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ],
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    strictPort: false,//如果端口占用，是退出，还是尝试其他端口
    https: false,// 是否开启 https
    // proxy: {
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  build: {
    outDir: 'dist',//Specify the output directory (relative to project root).
  }
})
