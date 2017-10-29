const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: ''  // 根目录，index.html 文件所在的目录
    }
  });

  // html 文件一改动，就重载页面
  // 思考：对于新加入的文件，能否监听到？
  gulp.watch("*.html").on('change', reload);
})

gulp.task('default', ['server'])