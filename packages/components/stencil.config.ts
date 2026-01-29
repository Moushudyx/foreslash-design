import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'foreslash-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      generateTypeDeclarations: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  extras: {
    experimentalImportInjection: true,
  },
  testing: {
    browserHeadless: "shell",
  },
  rollupConfig: {
    inputOptions: {
      external: ['foreslash', '@foreslash-ui/utils'] // 将需要排除的库添加到这里
    },
  },
  plugins: [
    sass()
  ]
};
