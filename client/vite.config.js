import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api/files': 'https://cloud-storage-project-backend.onrender.com/api/',
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
    },
    // Add base URL for production deployment
    base: '/',
    // Ensure proper handling of environment variables
    define: {
        'process.env': {}
    }
})