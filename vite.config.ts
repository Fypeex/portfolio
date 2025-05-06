import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import {resolve} from 'path'
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), svgr()],
    build: {
        chunkSizeWarningLimit: 1000, // optional: raise warning threshold
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                google: resolve(__dirname, 'public/google0860d9b864b3d0c2.html')
            },
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.split('node_modules/')[1].split('/')[0]            // splits each dependency into its own chunk
                    }
                }
            }
        }
    },
    base: "/portfolio/",
})
