import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['ping-pong.svg'],
            manifest: {
                name: 'Modern Table Tennis Score Board',
                short_name: 'TT Score Board',
                description: 'Nice Modern Table Tennis Score Board',
                theme_color: '#ffffff',
                icons: [
                {
                    src: 'ping-pong.svg',
                    sizes: '192x192',
                    type: 'image/svg'
                },
                {
                    src: 'ping-pong.scg',
                    sizes: '512x512',
                    type: 'image/svg'
                }
                ]
            }
        })
    ],
})
