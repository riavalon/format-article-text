import PLUGINS from './rollup/plugins';

export default {
  entry: 'src/main.ts',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: process.env.NODE_ENV === 'production' ? false : 'inline',

  plugins: PLUGINS
};
