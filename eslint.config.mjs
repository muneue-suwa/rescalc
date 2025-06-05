import xoSpaceBrowser from 'eslint-config-xo/space/browser';
import {defineConfig} from 'eslint/config';

export default defineConfig([
  xoSpaceBrowser,
  {
    languageOptions: {
      globals: {
        chrome: 'readonly',
      },
    },
  },
]);
