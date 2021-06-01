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
    proxy: {
      '/api': {
        // 替换为本机IP
        target: 'http://192.168.3.173:2888',
        changeOrigin: true,
      },
      // '/api': {
      //   target: 'http://39.97.254.142:2888',
      //   changeOrigin: true,
      // },
    },

  },
  build: {
    outDir: 'dist',//Specify the output directory (relative to project root).
  }
})
