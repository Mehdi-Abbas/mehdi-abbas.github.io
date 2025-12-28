import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({ 
    plugins: [tailwindcss(), sveltekit()],
    server: {
    port: 5173,
    open: true,
    strictPort: true,
    host: '192.168.4.104',
  },
});
