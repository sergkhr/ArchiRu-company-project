# Пояснения к переносу из локала на сервер
## Что изменить
- изображение небоскребов в папке src - это задний фон для главной страницы\
заменяется в main.less -- там в :root переменная, котороя испольузуется в коде
- в index.html в logo картинка имеет путь на картинку в папке src, это временная картинка -- заменить

## На что обратить внимание
- В index.html у меню и секций контента есть атрибут data-index. Это связывает элемент меню с секцией контента.\
По id привязки нет. id испольузется для стилей