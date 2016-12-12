var gulp = require('gulp');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');

var nodemon_instance;

function restart_nodemon() {
    if (nodemon_instance) {
        console.log('Restarting nodemon');
        nodemon_instance.emit('restart');
    } else {
        console.log('Nodemon instance not ready yet');
    }
};

gulp.task('babel-server', function() {
    return gulp.src('src/index.js')
        .on('error', function(error) {
            console.log('Babel server:', error.toString());
        })
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app'))
        .on('end', function() {
            gulp.src('src/server/**/*.*')
                .on('error', function(error) {
                    console.log('Babel server:', error.toString());
                })
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(gulp.dest('app/server'))
                .on('end', function() {
                    restart_nodemon();
                });
        });
});

gulp.task('bable-client', function() {
    return gulp.src('./src/client/js/index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./app/client'));
    /*return browserify({
            entries: 'src/client/js/index.js',
            dubug: true
        })
        .transform(babelify)
        .bundle()
        .on('error', function(error) {
            console.log('Babel server:', error.toString());
        })
        .pipe(source('index.js'))
        .pipe(gulp.dest('app/client'));
        */
});

gulp.task('views', function() {
    return gulp.src('./src/client/views/**/*.*')
        .pipe(gulp.dest('app/client/views'));
});

gulp.task('nodemon', function() {
    if (!nodemon_instance) {
        nodemon_instance = nodemon({
            script: './app/index.js'
        }).on('restart', function() {
            console.log('Restart Server');
        });
    } else {
        nodemon_instance.emit('restart');
    }

});

gulp.task('default', ['babel-server', 'bable-client', 'views']);

gulp.task('watch', ['default', 'nodemon'], function() {
    gulp.watch(['src/index.js', 'src/server/**/*.*'], ['babel-server']);
    gulp.watch('src/client/js/**/*.*', ['bable-client']);
    gulp.watch('src/client/views/**/*.*', ['views']);
});