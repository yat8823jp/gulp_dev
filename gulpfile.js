// gulpプラグインの読みこみ
var gulp = require('gulp');
// 画像を圧縮するプラグインの読み込み
var imagemin = require("gulp-imagemin");
var webserver = require('gulp-webserver');
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

//Webサーバー
gulp.task('webserver', function() {
  gulp.src('./') //Webサーバーで表示するサイトのルートディレクトリを指定
    .pipe(webserver({
      livereload: true, //ライブリロードを有効に
      directoryListing:true //ディレクトリ一覧を表示するか。オプションもあり
/*
      proxies: [
        {
          source: './',
          target: 'http://localhost:8888/sample/'
        }
      ]
*/
    }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./",
            proxy: 'localhost:8888'
        }
    });
});

gulp.task('default', ['webserver']);