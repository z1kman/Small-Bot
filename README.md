# Small-Bot
Визуальный конструктор чат-ботов для сайтов
# Содержание
1. [Описание](#description)
2. [Основные страницы проекта](#CommonPage)
3. [Демонстрация работы (видео You Tube)](#Video)
4. [Запуск проекта](#StartProject)

# <a name="description">Описание</a>

## О проекте
Данный проект позволяет любому человеку создавать чат-ботов для сайтов.
Для создания чат-бота, в данном конструкторе, не нужно обладать навыками программирования и какими-то особыми знаниями конструктора.
При разработке использовались языки HTML, CSS, Java Script. В качестве сервера был использован Node Js с фреймворком Express, а в качестве базы данных я использовал Mongo DB(Local). 

## <a name="CommonPage">Основные страницы проекта </a>

### Главная страница
Главная страница проекта доступная по адресу `http://localhost:3000/main`.
![](https://i.ibb.co/QKs9GDW/1.jpg)

### Страница с контактной информацией
Страница с контактной информацией доступна по адресу `http://localhost:3000/contacts`. 
В качестве контактной информации, я оставил данные своего ВУЗа.
![](https://i.ibb.co/hZ1zwvK/1.jpg)

### Страница конструктора
Страница конструктора распологается по адресу `http://localhost:3000/constructor`. Но перед тем, как попасть на данную страницу необходимо
войти в уже существующий аккаунт или же создать новый (при регистрации нового аккаунта все данные хранятся в локальной базе данных).

Страница конструктора с примером заполнения:
![](https://i.ibb.co/H77vZTy/image.jpg)

## <a name="Video">Демонстрация работы (видео You Tube) </a>
[![](http://img.youtube.com/vi/bZGllXZ_x08/0.jpg)](https://youtu.be/bZGllXZ_x08)

Пример из демонстрационного видео находится в данном проекте и доступен по адресу: `project\TestProject`; 
 
# <a name="StartProject">Запуск проекта</a>
Для того, чтобы запустить проект необходимо иметь установленный Node Js и MongoDB.

Скачать Node Js можно по ссылке: https://nodejs.org/ru/. 

Скачать MongoDB можно по ссылке: https://www.mongodb.com/try/download/community (рекомендую скачать zip версию)

Для успешного запуска проекта необходимо:
1. Запустить сервер MongoDB;
2. Запустить сервер Node Js;

## Запуск сервера MongoDB

Чтобы запустить сервер MongoDB необходимо:
1. Распаковать скаченный архив в любое место на жестком диске;
2. Создать папку, в которой будет храниться база данных;
3. Запустить сервер;

Для запуска сервера необходимо: Открыть консоль `->` Открыть в консоли папку с распакованным MongoDB `->` перейти в папку "bin" `->` запустить mongod с флагом dbpath, где в dbpath указать адрес на папку, в которой должна храниться база данных.

Пример команды запуска сервера: локальная база данных хранится по адресу `D:\mongodb\Data` тогда команда запуска будет выглядеть следующим образом: `mongod --dbpath"D:\mongodb\Data"`.

## Запуск сервера Node Js

После успешного запуска сервера базы данных (MongoDB), необходимо запустить сервер Node Js. Для этого необходимо:
1. Открыть данный проект в консоли и перейти в `project\Expressapp`;
2. Запустить сервер Node Js командой `npm start` или `node Server.js`;
3. Открыть страницу проекта в браузере по адресу: `http://localhost:3000/main`(главная страница сайта)
