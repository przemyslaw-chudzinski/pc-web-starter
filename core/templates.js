const {src, dest, task, watch, series} = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const hbsConfig = require('./hbs-config');
const hbsData = require('../src/data');
/*
- It compiles template files
 */
task('tpl:compile', () => src('./src/pages/**/*.hbs')
    .pipe(handlebars(hbsData, hbsConfig))
    .pipe(rename(path => path.extname  = '.html'))
    .pipe(dest('./dist')));
/*
- It watches changes of templates files
 */
task('tpl:watch', () => {
    series('tpl:compile')();
    watch('./src/**/*.hbs', series('tpl:compile'));
});
