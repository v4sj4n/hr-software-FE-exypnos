import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      'chunk-ZBX3FWUD',
      'chunk-XJVMIUFE',
      'chunk-3YZKJZHA',
      'chunk-BSDD2RUE',
      'chunk-EFOY56UG',
      'chunk-6MLLCQEY',
      'chunk-WPOOW4B6',
      'chunk-6EX4HPLT',
      'chunk-T3OND56R',
      'chunk-VET6SEH4',
      'chunk-5NT3O44W',
      'chunk-BQEZXR37',
      'chunk-67YFFFNJ',
      'chunk-Z7UQE4EE'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

})


