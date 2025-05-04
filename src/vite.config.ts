
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { UserConfig } from "vite";

// Configuración optimizada para TypeScript y React Query
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
    },
    define: {
      'process.env.VITE_MAPBOX_API_TOKEN': JSON.stringify(env.MAPBOX_API_TOKEN),
      __DEV__: mode === 'development' ? 'true' : 'false'
    },
    plugins: [
      react({
        tsDecorators: true,
      }),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        '@tanstack/react-query': path.resolve(__dirname, 'node_modules/@tanstack/react-query'),
      },
    },
    build: {
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-query': ['@tanstack/react-query'],
            'supabase': ['@supabase/supabase-js'],
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        '@tanstack/react-query',
        '@supabase/supabase-js',
        'react',
        'react-dom'
      ],
      esbuildOptions: {
        tsconfigRaw: {
          compilerOptions: {
            // Configuración específica para ESBuild
            experimentalDecorators: true
            // Removed maxNodeModuleJsDepth property
          }
        }
      }
    }
  };
});
