const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm')

const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;
const sourcemaps = require('gulp-sourcemaps');


const uglify = require('gulp-uglify');

const concat = require('gulp-concat');


const files = [
    'index.html', 'sprite.svg'

]

const styles = ['main.css', 'normalize.css']

task('clean', () => {
    console.log(env);
    return src('../', { read: false })
        .pipe(rm())
})


task('copy', () => {
    return src(files).pipe(dest('../'))
})

task('copyi', () => {
    return src('img/**/*').pipe(dest('../img'))
})

task('copyf', () => {
    return src('fonts/**/*').pipe(dest('../fonts'))


})

task('styles', () => {
    return src(styles).pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.css')).pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('../'));
})

task('js', () => {
    return src('index.js')
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))

    .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))

    .pipe(dest('../'));
});

task('default', series('clean', 'copy', 'copyi', 'copyf', 'styles', 'js'))
task('build', series('clean', 'copy', 'copyi', 'copyf', 'styles', 'js'))