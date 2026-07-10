const path = require('path');

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@env': './config/env.local.js',
          '@store': path.resolve(__dirname, 'node_modules', '@controleonline', 'ui-common', 'src', 'react', 'stores', 'index.js'),
          '@stores': './src/shims/store.js',
          '@src': './src',
        },
      },
    ],
  ],
};
