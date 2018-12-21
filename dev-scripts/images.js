const {task, src, watch, series} = require('gulp');
const gulpCopy = require('gulp-copy');
/*
- It copies images to dist
*/
task('images:copy', () => src('./src/assets/images/**/*').pipe(gulpCopy('./dist', {prefix: 2})));
/*
- It watches images dir and move new images into dist folder
*/
task('images:watch', () => watch('./src/assets/images/**/*', series('images:copy')));
