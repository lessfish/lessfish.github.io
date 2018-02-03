const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

gulp.task('server', () => {
  browserSync.init({
    server: {
      // 根目录，index.html 文件所在的目录
      baseDir: './'  
    }
  })

  gulp.watch("*.html").on('change', reload);
})

gulp.task('default', ['server'])