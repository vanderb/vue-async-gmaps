import vue from "rollup-plugin-vue";
import buble from '@rollup/plugin-buble';
import commonjs from "rollup-plugin-commonjs";
import replace from "@rollup/plugin-replace";

const config = {
  input: "src/VueAsyncGmaps.vue",
  output: {
    name: "VueAsyncGmaps",
    exports: "named"
  },
  transforms: {asyncAwait: false},
  plugins: [
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
