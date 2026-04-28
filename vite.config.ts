import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves at https://ahsocreator.github.io/rom-landing-page/
  // so all built asset URLs need this base path prefix.
  base: '/rom-landing-page/',
  plugins: [react(), tailwindcss()],
})
