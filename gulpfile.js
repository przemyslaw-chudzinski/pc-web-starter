const {task, series, parallel} = require('gulp');
require('./core/sass');
require('./core/javascript');
require('./core/templates');
require('./core/server');
require('./core/images');

function buildDev(cb) {
    cb = cb || function () {};
    parallel('js:dev', 'sass:dev', 'tpl:compile', 'images:copy')();
    parallel('js:watch', 'sass:watch', 'tpl:watch', 'images:watch')();
    series('server:run')();
    cb();
}
function buildProd(cb) {
    cb = cb || function () {};
    parallel('js:prod', 'sass:prod', 'images:copy')();
    cb();
}

task('project:run', series(buildDev));
task('project:build', series(buildProd));
