var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    cssnano      = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs');


gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
        .pipe( sass() )
        .pipe( autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 10 versions']
        }) )
        .pipe( concat('style.min.css') )
        .pipe( cssnano() )
        .pipe( gulp.dest( 'app/css' ) )
        .pipe( browserSync.stream() );
});


gulp.task('scripts', function(){
    return gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe( concat('scripts.min.js') )
        .pipe( uglify() )
        .pipe( gulp.dest( 'app/js' ) )
        .pipe( browserSync.reload({ stream: true }) );
});


gulp.task('reload', function(){
    return gulp.src('app/**/*.html')
        .pipe( browserSync.reload({ stream: true }) );
});


gulp.task('browser-sync', function(){
    browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});


gulp.task('watch', function(){
    gulp.watch( 'app/sass/**/*.sass', gulp.parallel('sass') );
    gulp.watch( 'app/js/**/*.js', gulp.parallel('scripts') );
    gulp.watch( 'app/**/*.html', gulp.parallel('reload') );
});


gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch') );