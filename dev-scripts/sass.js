const {task, src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

/* COMPILE SCSS FILES */
/*
- Entry file path of main sass file
 */
const entryFilePath = './src/assets/sass/main.scss';
/*
- It compiles scss files into css file
- Output is not compressed
 */
task('sass:dev', () => src(entryFilePath)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css')));

/*
- It compiles scss files into css file
- Output is compressed
 */
task('sass:prod', () => src(entryFilePath)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('./dist/css')));

/*
- It watches scss files for changes and compiles into css
- Output is compressed
 */
task('sass:watch', () => {
    series('sass:dev')();
    watch('./src/assets/sass/**/*.scss', series('sass:dev'));
});

/*
- It adds prefixes to compiled css file
- Output is compressed
 */
task('css:autoprefixer', () => src('./dist/css/main.css')
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: true
    }))
    .pipe(dest('./dist/css')));

/*
- Production task for sass files
 */
task('sass:build', series('sass:prod', 'css:autoprefixer'));

