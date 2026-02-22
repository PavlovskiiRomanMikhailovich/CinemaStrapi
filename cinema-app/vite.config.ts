import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Используем require вместо import
const tsconfig = require('./tsconfig.json');

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, pathsArray]) => {
    const aliasPath = pathsArray[0].replace(/[^a-zA-Z]/g, '');
    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return webpackConfigAliases;
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
});