import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import visualizer from 'rollup-plugin-visualizer'
import json from '@rollup/plugin-json'
import pkg from './package.json'


export default {
  input: './lib.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'default',
    }
  ],
  plugins: [
    json(),
    external(),
    resolve(),
    commonjs(),
    image(),
    visualizer(),
  ]
}

