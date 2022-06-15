import replace from 'gulp-replace' //Поиск и замена
import plumber from 'gulp-plumber';//Обработка ошыбок
import notify from 'gulp-notify';//Cообшения (подсказки)
import browsersync from 'browser-sync';//локалный сервер
import newer from 'gulp-newer' //Проверка обновление
import ifPlugins from 'gulp-if'//Условная ветвление

//експортируем обьект
export const plugins = {
    replace:replace,
    plumber:plumber,
    notify:notify,
    browsersync:browsersync,
    newer:newer,
    if:ifPlugins
}