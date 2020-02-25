import vue from "rollup-plugin-vue";
import buble from '@rollup/plugin-buble';
import commonjs from "rollup-plugin-commonjs";
import replace from "@rollup/plugin-replace";

import babel from 'rollup-plugin-babel';

const config = {
  input: "src/VueAsyncGmaps.vue",
  output: {
    name: "VueAsyncGmaps",
    exports: "named"
  },
  transforms: {asyncAwait: false},
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
        '@babel/preset-env', {
            modules: false,
            "targets": {"node": "10"}
          }
        ]
      ],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    buble({
      transforms: {asyncAwait: false}
    })
  ]
};

export default config;
