# Mesto (Node.js / MongoDB) 

[About](#about) /
[Changelog](#changelog) /
[Environment](#environment) /
[Deploy](#deploy) /
[Contact](#contact)

## About
Backend for original <a href="https://github.com/avtorsky/react-mesto-auth" target="_blank">/react-mesto-auth</a> single page demo

Developed under the [Practicum](https://practicum.yandex.com/web/) online bootcamp with the following stack implementation:
* Node.js, Express, MongoDB, Mongoose, Joi

## Changelog
Release 20210812:
* feat(/controllers/users.js): /sign && /signup auth API endpoints release
* feat(/middlewares/auth.js): auth middleware && protected routing connection
* feat(/errors): centralized errors handling && controllers refactoring
* refactor(app.js): protect requests with prevalidation via Joi package

Release 20210730:
* feat(app.js): MongoDB connection, major release of controllers && models schema for API endpoints

Release 20210729:
* ci(package.json): scripts config, <a href="https://github.com/avtorsky/express-mesto" target="_blank">/express-mesto</a> repository setup && HTTP server init

## Environment
* `/routes` routing config
* `/controllers` controllers config for /users && /cards
* `/models` API scheme config for /user && /card models

## Deploy
* `npm run start` initiates an HTTP server
* `npm run dev` initiates an HTTP server with hot-reload

## Contact
__GitHub:__ <a href="https://github.com/avtorsky" target="_blank">https://github.com/avtorsky</a>
