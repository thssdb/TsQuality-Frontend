import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '#',
        replacement: path.resolve(__dirname, './types'),
      },
    ],
  },
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()],
    }),
  ],
  server: {
    host: '0.0.0.0',
  },
})
