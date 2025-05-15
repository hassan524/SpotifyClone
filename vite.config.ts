import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as fs from 'fs'; 

import * as path from 'path' 

export default defineConfig({
  root: 'src/renderer',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/renderer'),
    },
  },
  base: './',
  build: {
    outDir: '../../dist-react',
  },
  server: {
    https: {
      key: fs.readFileSync('myapp-key.pem'),
      cert: fs.readFileSync('myapp.pem'),
    },
    host: 'myapp',
    port: 3000,
  },
})
