import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const tsconfig = require('./tsconfig.json');

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, pathsArray]) => {
    const cleanAlias = alias.replace(/\/\*$/, '');
    const rawPath = pathsArray[0];
    const cleanPath = rawPath.replace(/\/\*$/, '');
    const fullPath = path.join(SRC_PATH, cleanPath);
    
    webpackConfigAliases[cleanAlias] = fullPath;
  });

  return webpackConfigAliases;
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
});