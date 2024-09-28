import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, './src/main.tsx'],
      coverage: {
        exclude: [
          ...configDefaults.coverage.exclude!,
          './src/models/*',
          './src/main.tsx',
        ],
      },
    },
  }),
);
