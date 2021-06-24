import buble from '@rollup/plugin-buble';
import babel from "rollup-plugin-babel";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

import pkg from './package.json';

const banner = `/*!
 * vuex-proxy v${pkg.version}
 * (c) ${new Date().getFullYear()} Logan
 * @license MIT
 */`;

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      name: 'VuexHero',
      file: 'dist/vuex-hero.js',
      format: 'umd',
    },
    {
      compact: true,
      banner,
      plugins: [minify({ comments: false })],
      name: 'VuexHero',
      file: 'dist/vuex-hero.min.js',
      format: 'umd',
    },
  ],
  external: ['vuex', 'vue'],
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: "node_modules/**",
      externalHelpers: true
    }),
    buble({ transforms: { dangerousForOf: true } }),
    resolve(),
    commonjs(),
  ]
};
