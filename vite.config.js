import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages repository name is 'Nex', so we need this base path for production
  base: process.env.NODE_ENV === 'production' ? "/Nex/" : "/",
})
