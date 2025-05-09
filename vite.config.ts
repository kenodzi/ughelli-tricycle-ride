
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/ughelli-tricycle-ride/', // Essential for GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Define environment variables
  define: {
    // This provides the equivalent of process.env as import.meta.env
    'process.env': {},
    // Add the Google Maps API key directly
    'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify("AIzaSyB-AC0xuTbcdzH_L3Lvdqh0eO5peyUVpAM")
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000, // Increase limit or
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        404: path.resolve(__dirname, 'public/404.html') // Add this
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          tanstack: ['@tanstack/react-query'],
        }
      }
    }
  }
}));
