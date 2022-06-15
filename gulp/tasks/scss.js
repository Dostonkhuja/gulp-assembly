import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //сжатие css файла
import webpcss from 'gulp-webpcss'//выбор webp изображение
import autoprefixer from 'gulp-autoprefixer'; //добавляет вендорных префиксов
import groupcCssMediaQueries from 'gulp-group-css-media-queries'//групприровка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title:"SCSS",
                message:"Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g,'../img/'))
        .pipe(sass({
            outputStyle:'expanded'
        }))
        .pipe(app.plugins.if(app.isBuild,groupcCssMediaQueries()))
        .pipe(app.plugins.if(
            app.isBuild,webpcss({
            webpClass:".webp",
            noWebpClass:".no-webp"
        })))
        .pipe(app.plugins.if(
            app.isBuild,autoprefixer({
            grid:true,
            overrideBrowserList:["last 3 versions"],
            cascade:true
        })))
        //Раскоментировать если нужен не сжатый дубль файла стилей
        .pipe(app.gulp.dest(app.path.build.css))

        .pipe(app.plugins.if(app.isBuild,cleanCss()))
        .pipe(rename({
            extname:".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}