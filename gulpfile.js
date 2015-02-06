/* jshint node:true */
'use strict';
// generated on 2015-01-29 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var TEMP = '.tmp';
var $ = require('gulp-load-plugins')();

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function () {
    log('Creating an AngularJS $templateCache');

    return gulp
        .src('app/**/*_tmpl.html')
        .pipe($.minifyHtml({ empty: true }))
        .pipe($.angularTemplatecache())
        .pipe(gulp.dest(TEMP));
});

gulp.task('concat', function () {
    gulp.src('app/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.concat('script.js'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(TEMP));
});

gulp.task('usemin', function () {
    return gulp.src('*.html')
        .pipe(usemin({
            css: [$.minifyCss(), 'concat'],
            html: [$.minifyHtml({ empty: true })],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp.src('app/**/*.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('app/assets/css'));
});

gulp.task('jshint', function () {
  return gulp.src('app/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles', 'templatecache', 'concat'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if(TEMP+'/*.js', $.uglify()))
    .pipe($.if(TEMP+'/*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});



gulp.task('images', function () {
  return gulp.src('assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, [TEMP, 'dist']));

gulp.task('connect', ['styles', 'fonts'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('.tmp'))
    .use(serveStatic('app'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/**/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('assets/css'));

  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app/'));
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    TEMP+'/**/*.css',
    'app/**/*.js',
    TEMP+'/**/*.js',
    'assets/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});


/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' +
        (data.endSize / 1000).toFixed(2) + ' kB and is ' +
        formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted perentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}