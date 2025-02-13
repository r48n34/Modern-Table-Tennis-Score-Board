import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig(({ command }) => {
    if (command === 'serve') { // dev
        return {
            plugins: [
                react()
            ],
            build: {
                sourcemap: false,
            }
        }
    } else {
        // command === 'build'

        const dynamicRoutes = [
            "/",
            "/multi",
            "/roadmap",
            "/roadmap/en",
            "/roadmap/ch"
        ]
        
        return {
            plugins: [
                Sitemap({ hostname: 'https://modern-table-tennis-score-board.vercel.app/', dynamicRoutes }),
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
            esbuild: {
                drop: ['console', 'debugger'],
            },
            build: {
                sourcemap: false,
            }
        }
    }
})

