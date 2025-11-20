import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/AWDS-Rebalanced-v2/',
  plugins: [
    tailwindcss(),
    react()
  ]
})
