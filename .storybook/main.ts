import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenOptions: {
      shouldExtractLiteralValuesAsTypes: true,
      shouldRemoveUndefinedFromOptional: true,
      tsconfigPath: join(__dirname, '../tsconfig.json'),
    },
  },
};

export default config;

