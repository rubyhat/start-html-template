var gulp 						 = require('gulp'),
		sass 						 = require('gulp-sass'),
		browserSync  	 	 = require('browser-sync'),
		concat		  	 	 = require('gulp-concat'),
		uglify  	 			 = require('gulp-uglifyjs'),
		csso					 	 = require('gulp-csso'),
		rename 					 = require('gulp-rename'),
		del  						 = require('del'),
		imagemin  			 = require('gulp-imagemin'),
		pngquant  			 = require('imagemin-pngquant'),
		cache  					 = require('gulp-cache'),
		autoprefixer     = require('gulp-autoprefixer'),
		posthtml  			 = require('gulp-posthtml'),
		include 				 = require('posthtml-include');

gulp.task('sass', function() {
	return gulp.src('src/sass/style.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.reload({stream: true}))
	.pipe(csso())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('build/css'));
});


// gulp.task('browser-sync', function() {
// 	browserSync({
// 		server: {
// 			baseDir: 'build/'
// 		},
// 		notify: false //Уведомления справа сверху при открытии страницы в браузере
// 	})
// });


gulp.task('scripts', function() {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/Brazzers-Carousel/jQuery.Brazzers-Carousel.min.js',
		'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});


gulp.task('clean', function() {
	return del('build');
});

gulp.task('clean-cache', function() {
	return cache.clearAll();
});


gulp.task('img', function () {
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('build/img'));
});

gulp.task('fonts', function () {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function () {
	return gulp.src('src/*.html')
	.pipe(posthtml([
		include()
		]))
	.pipe(gulp.dest("build/"))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('js', function () {
	return gulp.src('./src/js/*.js')
	.pipe(gulp.dest("build/js"))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', function() {
	browserSync({
		server: {
			baseDir: 'build/'
		},
		notify: false //Уведомления справа сверху при открытии страницы в браузере
	});

	gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
	gulp.watch('src/**/*.html', gulp.parallel('html'));
	gulp.watch('src/js/**/*.js', gulp.parallel('js'));
	gulp.watch('src/img/**/*.*', gulp.parallel('img'));
});

gulp.task("copy", function() {
    return gulp.src([
        "src/fonts/**/*.{woff,woff2}",
    ], {
        base: "./src"
    })
    .pipe(gulp.dest("build"));
});

// gulp.task("build",
//     gulp.series(
//         "clean",
//         "copy",
//         "img",
//         "sass",
//         "js",
//         "html",
//     ));

// gulp.task('build', function () {
// 	var buildCss = gulp.src([
// 			'src/css/style.min.css',
// 		])
// 	.pipe(gulp.dest('build/css'));

// 	var buildCopy = gulp.src(['src/fonts/**/*','src/libs/**/*'], {
// 		base: "./src"
// 	})
// 	.pipe(gulp.dest('build/fonts'));

// 	var buildJs = gulp.src('src/js/**/*')
// 	.pipe(gulp.dest('build/js'));

// 	var buildHtml = gulp.src('src/**/*.html')
// 	.pipe(gulp.dest('build'));

// });


gulp.task('default',gulp.series( 'clean', 'copy', 'sass', 'img', 'fonts', 'js', 'html', 'watch'));