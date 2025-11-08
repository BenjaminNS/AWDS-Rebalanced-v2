import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/AWDS-Rebalanced-v2/',
  plugins: [
    tailwindcss(),
  ],
})