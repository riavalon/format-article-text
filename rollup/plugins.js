const typescript = require('rollup-plugin-typescript');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify');
const postcss = require('rollup-plugin-postcss');

// PostCSS plugins
const simplevars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');

export default [
  commonjs({
    namedExports: {
      'react': ['createElement', 'PropTypes', 'Component']
    }
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  postcss({
    plugins: [
      simplevars(),
      nested(),
      cssnext(),
      cssnano(),
    ],
    extensions: ['.css']
  }),
  replace({
    ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  typescript(),
  (process.env.NODE_ENV === 'production' && uglify())
];
