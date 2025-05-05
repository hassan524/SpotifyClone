import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
// import path from 'path' 

export default defineConfig({
  root: 'src/renderer',
  plugins: [react(), tailwindcss()],
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
  }
})
