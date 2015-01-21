// gulpプラグインの読みこみ
var gulp = require('gulp');
// 画像を圧縮するプラグインの読み込み
var imagemin = require("gulp-imagemin");
var browserSync = require('browser-sync');

/*
* imagesフォルダー以下のファイルを監視し、
* 変更があり次第imagesフォルダー以下の画像の圧縮を実行するタスク
* */
gulp.task("watchTask", function() { // 「watchTask」という名前のタスクを登録
	gulp.watch("images/**", function() {   // imagesフォルダ以下のファイルを監視
		gulp.src("images/*.png")
		.pipe(imagemin())
		.pipe(gulp.dest("minified_image"));
	});
});

gulp.task('browser-sync', function() {
	// browserSyncが、MAMPのディレクトリ構造と紐づきます
	browserSync({
		proxy: "localhost:8888"
	});
});

/**
* Task
 */
gulp.task('HTML:reload', function() {
	gulp.src('./**/*.html')
		.pipe( browserSync.reload({ stream:true }) );
})
gulp.task('PHP:reload', function() {
	gulp.src('./**/*.php')
		.pipe( browserSync.reload({ stream:true }) );
})
gulp.task('JS:reload', function() {
	gulp.src('./**/*.js')
		.pipe( browserSync.reload({ stream:true }) );
})


/**
* Command
 */
gulp.task('default', ['browser-sync'],function(){
	gulp.watch('./**/*.php',['PHP:reload']);
	
	// **
	// HTMLやJSなどがあれば、下記を有効にする
	// *
	// gulp.watch('./**/*.html',['HTML:reload']);
	// gulp.watch('./**/*.js',['JS:reload']);
});