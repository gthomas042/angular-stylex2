import { Configuration, DefinePlugin } from 'webpack';
import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
const StylexPlugin = require('@stylexjs/webpack-plugin');

// Source: https://github.com/just-jeb/angular-builders/blob/master/examples/custom-webpack/full-cycle-app/func-webpack.config.ts
/**
 * This is where you define a function that modifies your webpack config
 */
export default (
  cfg: Configuration,
  opts: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {

  if(cfg && cfg.plugins) {

    cfg.plugins.push(   
      new StylexPlugin({
        filename: 'custom_styles.css',
        dev: cfg.mode === 'development'
      })
    );

    cfg.cache = true;
  } 

  return cfg;
};


// module.exports = (env: any) => {  

//   return {
//     plugins: [
//       new StylexPlugin({
//         filename: 'custom_styles.css',
//         dev: true
//       }),
//     ],
//     cache: true
//   };
  
// };
