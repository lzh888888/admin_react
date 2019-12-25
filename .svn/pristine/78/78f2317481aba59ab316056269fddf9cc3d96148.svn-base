const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      disableDynamicImport: false,
      publicPath: '/',
    },
    production: {
      disableDynamicImport: true,
      publicPath: './',
    },
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  hash: true,
};
