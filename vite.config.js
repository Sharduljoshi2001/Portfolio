import {defineConfig} from "vite"

export default defineConfig({
	plugins: [],
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		sourcemap: false,
		minify: 'terser',
		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].[hash].js',
				chunkFileNames: 'assets/[name].[hash].js',
				assetFileNames: 'assets/[name].[hash].[ext]'
			}
		}
	},
	base: './',
	server: {
		port: 3000,
		open: true
	}
})