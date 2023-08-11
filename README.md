# Дипломный проект для Яндекс.Практикум


## Технологии:
  <a href="https://expressjs.com/ru/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Express-090909?style=for-the-badge&logo=Express" alt="Express" /></a>
  <a href="https://nodejs.org/ru" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Node.js-090909?style=for-the-badge&logo=Node.js" alt="Node.js" /></a>
  <a href="https://mongoosejs.com/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Mongoose-090909?style=for-the-badge&logo=mongoose&logoColor=a03333" alt="Mongoose" /></a>
  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-MongoDB-090909?style=for-the-badge&logo=MongoDB" alt="MongoDB" /></a>
  <a href="https://www.postman.com/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Postman-090909?style=for-the-badge&logo=Postman" alt="Postman" /></a>
  <a href="https://eslint.org/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Eslint-090909?style=for-the-badge&logo=Eslint&logoColor=blue" alt="Eslint" /></a>
  <a href="https://jwt.io/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Jsonwebtokens-090909?style=for-the-badge&logo=json-web-tokens&logoColor=d63aff" alt="jwt" /></a>

### Функционал:

+ Регистрация
+ Авторизация
+ Обновление данных пользователя
+ Получение списка пользователя
+ Получение информации о текущем пользователе
+ Получение списка фильмов
+ Создание фильма
+ Удаление фильма
+ Постановка лайка
+ Снятие лайка
+ Центральная обработка ошибок
+ Валидация входящих данных
+ Защитита API авторизации
------
### О чём проект?

*Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.*

* Возможность зарегестрироваться и залогиниться с помощью почты и пароля. Токен для авторизации хранится 7 дней.
* У каждого пользователя есть поля name, email, password. Их можно задать при регистрации.
* Поля name, email можно обновить после регистрации.
* Можно создавать карточку фильма. У каждой каточки есть есть поля director, trailerLink (ссылка на картинку), owner (id создателя карточки), createdAt (дата создания карточки) и массив likes (лайков карточки, которые могут ставить пользователи).
* Карточки можно создавать и удалять, а также лайкать.
* Поля валидируются (например ссылки или email).
------
### Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и фильма   
`/models` — папка с файлами описания схем пользователя и фильма

Остальные директории вспомогательные, создаются при необходимости разработчиком

### Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

### Ссылки на проект

IP <a href="http://158.160.66.2/" target="_blank" rel="noreferrer">158.160.66.2</a>  
Backend <a href="https://api.voredev.nomoreparties.co/" target="_blank" rel="noreferrer">api.voredev.nomoreparties.co</a>


Репозиторий:

```bash
git clone https://github.com/maratdev/movies-explorer-api
```
