module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@env': './config/env.local.js',
          '@src': './src',
        },
      },
    ],
  ],
};
