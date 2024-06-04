import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/index.ts',
      output: {
        format: 'cjs', // Specify the CommonJS module format for Node.js
        fileName: 'index.js', // Set the desired output filename
      },
    },
  },
});