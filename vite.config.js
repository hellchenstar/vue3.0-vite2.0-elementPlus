/*
 * @Author: chenx
 * @Descripttion:
 * @Date: 2022-03-14 10:51:53
 * @LastEditors: chenx
 * @LastEditTime: 2024-02-27 11:15:56
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
const config = {
  base: '/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'vuex'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    open: true,
    strictPort: false, // 如果端口占用，是退出，还是尝试其他端口
    https: false, // 是否开启 https
    proxy: {
      // 远端服务
      // '/api': {
      //   target: 'http://139.129.101.158:21009',
      //   changeOrigin: true,
      // },
      // 本地服务
      '/api': {
        target: 'http://localhost:21009',
        changeOrigin: true,
      },
    },
    fs: {
      // 默认： false (将在后续版本中改为 true)
      // 限制为工作区 root 路径以外的文件的访问。
      strict: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    assetsInlineLimit: 0,
    assetsDir: 'assets',
    rollupOptions: {
      // external: ['vue', 'vuetify','element-plus'],
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
}
export default defineConfig(config)
