import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api/files': 'http://cloud-storage-project-backend.onrender.com/',
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
    },
})