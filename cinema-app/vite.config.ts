import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const tsconfig = require('./tsconfig.json');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const aliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, pathsArray]) => {
    const cleanAlias = alias.replace(/\/\*$/, '');
    const rawPath = pathsArray[0];
    const cleanPath = rawPath.replace(/\/\*$/, '');
    const fullPath = path.resolve(__dirname, cleanPath);
    
    aliases[cleanAlias] = fullPath;
  });

  return aliases;
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths)
  },
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-ignore
        importer: (url: string) => {
          if (url.startsWith('@/')) {
            const filePath = url.replace('@/', '');
            const finalPath = filePath.endsWith('.scss') ? filePath : `${filePath}.scss`;
            const fullPath = path.join(SRC_PATH, finalPath);
            return { file: fullPath };
          }
          return null;
        }
      }
    }
  }
});