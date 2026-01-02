import { sync } from 'glob';
import { defineConfig } from 'vite'
import path, { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, mode, ssrBuild }) => {
    const list = [];
    if (mode === 'production') {
        // Tylko właściwe pliki HTML, ignoruj backupy i temp files
        const htmlFiles = sync('src/*.html').filter(file => {
            const fileName = file.split('/').pop();
            return !fileName.match(/index[0-9]+\.html|\.bak\.html/);
        });

        htmlFiles.forEach((file) => {
            list.push(file);
        })
    }

    // Custom domain (mailist.pl) - używamy root path
    // Jeśli używasz project page GitHub Pages (bez custom domain), zmień na '/mailist-landing-page/'
    const base = '/';

    // CRITICAL: Ensure base path is applied to all asset references
    console.log('Building with base path:', base);

    return {
        root: "src",
        base: base,
        server: {
            open: true
        },
        plugins: [
            tailwindcss(),
            handlebars({
                partialDirectory: resolve('./src/partials'),
                context: {
                    VITE_MAILIST_API_URL: process.env.VITE_MAILIST_API_URL || 'https://api.mailist.pl/v1/contacts',
                    VITE_MAILIST_API_KEY: process.env.VITE_MAILIST_API_KEY || '',
                    VITE_MAILIST_LIST_NAME: process.env.VITE_MAILIST_LIST_NAME || 'mailist-landing',
                },
            }),
        ],
        resolve: {
            alias: {
                "@css": path.resolve("./src/assets/css/"),
                "@/*": path.resolve("./*"),
            },
        },
        build: {
            outDir: "../dist",
            emptyOutDir: true,
            // Zwiększ limit ostrzeżeń dla większych chunków
            chunkSizeWarningLimit: 1000,

            // Optymalizacje wydajności
            target: 'es2015', // Szeroka kompatybilność przeglądarek
            minify: 'terser', // Agresywna minifikacja
            terserOptions: {
                compress: {
                    drop_console: true, // Usuń console.log w produkcji
                    drop_debugger: true,
                    pure_funcs: ['console.log', 'console.info'], // Usuń konkretne funkcje
                    passes: 2, // Wielokrotna kompresja dla lepszych wyników
                },
                format: {
                    comments: false, // Usuń komentarze
                },
            },

            // CSS Code Splitting i optymalizacja
            cssCodeSplit: true,
            cssMinify: 'lightningcss',

            // Source maps - wyłączone w produkcji dla mniejszego rozmiaru
            sourcemap: false,

            // Optymalizacje rollup
            rollupOptions: {
                input: [
                    ...list,
                ],
                output: {
                    // Manualne code splitting dla lepszej kontroli cache
                    manualChunks: (id) => {
                        // Vendor chunks - biblioteki rzadko się zmieniają
                        if (id.includes('node_modules')) {
                            // Rozdziel duże biblioteki na osobne chunki
                            if (id.includes('lucide')) {
                                return 'vendor-lucide';
                            }
                            if (id.includes('preline')) {
                                return 'vendor-preline';
                            }
                            if (id.includes('apexcharts')) {
                                return 'vendor-charts';
                            }
                            if (id.includes('flatpickr') || id.includes('simplebar')) {
                                return 'vendor-ui';
                            }
                            // Pozostałe vendor dependencies
                            return 'vendor-core';
                        }
                    },

                    // Cache busting - hash w nazwach plików
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: (assetInfo) => {
                        // Organizuj assety według typu
                        const info = assetInfo.name.split('.');
                        const ext = info[info.length - 1];

                        if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
                            return `assets/images/[name]-[hash][extname]`;
                        }
                        if (/woff2?|eot|ttf|otf/i.test(ext)) {
                            return `assets/fonts/[name]-[hash][extname]`;
                        }
                        return `assets/[ext]/[name]-[hash][extname]`;
                    },

                    // Optymalizuj generowany kod
                    compact: true,
                },
            },

            // Optymalizacja assetów
            assetsInlineLimit: 4096, // Inline małe assety (< 4kb) jako base64

            // Report compressed size
            reportCompressedSize: true,
        },

        // Optymalizacje podczas development
        optimizeDeps: {
            include: ['lucide', 'preline', 'simplebar', 'flatpickr'],
            exclude: [],
        },

        // Performance hints
        preview: {
            port: 4173,
            strictPort: false,
        },
    }
})
