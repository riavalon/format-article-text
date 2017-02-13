import PLUGINS from './rollup/plugins';

export default {
  entry: 'src/main.tsx',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: process.env.NODE_ENV === 'production' ? false : 'inline',

  plugins: PLUGINS
};
