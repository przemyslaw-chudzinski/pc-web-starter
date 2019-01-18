const {task, watch, series} = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

/* COMPILE JAVASCRIPT FILES */

// mode: string - development | production
const webpackCompiler = (mode = 'development') => {
    webpackConfig.mode = mode;
    return webpack(webpackConfig);
};
/*
- It builds production javascript
 */
function jsBuildProd(cb) {
    cb = cb || function () {};
    webpackCompiler('production').run();
    cb();
}
task('js:prod', series(jsBuildProd));
/*
- It builds development javascript
 */
function jsBuildDev(cb) {
    cb = cb || function () {};
    webpackCompiler().run();
    cb();
}
task('js:dev', series(jsBuildDev));
/*
- It watches javascript files and compiles for changes
 */
task('js:watch', () => {
    series(jsBuildDev)();
    watch('./src/assets/js/**/*.js', series(jsBuildDev));
});
