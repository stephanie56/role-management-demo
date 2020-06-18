# Role Management Demo

## Get Started

```
  yarn start
```

Graphql server will be opened on `http://localhost:4000/graphql`

## Dependencies

- Node: version 12

## Set up Database

- Install mysql
- Create user and database

```
mysql -uroot -p
CREATE DATABASE role_management_demo;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'user_password';
GRANT SELECT, INSERT, DELETE ON role_management_demo.* TO 'admin'@'localhost';
use role_management_dem
```

## Options to create database connection

Use `.env` or `ormconfig.env` to store the following:

```
TYPEORM_NAME=default
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=localhost
TYPEORM_USERNAME=username
TYPEORM_PASSWORD=password
TYPEORM_DATABASE=role_management_demo
TYPEORM_PORT=3306
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
TYPEORM_ENTITIES=src/entities/**/*.*
```
