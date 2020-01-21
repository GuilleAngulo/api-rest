# 📡 API REST
The project is composed of two different APIs REST. One is based on a SQL database (Postgres) and the other on a NoSQL database (Mongodb).

## PostgreSQL with Sequelize
It makes use of the Node ORM [Sequelize](https://sequelize.org/). The schema is very simple, only three entities: User, Address and Tech. The one-to-many (User-Address) and many-to-many (User-Tech) relationships are covered. Each controller have all the CRUD operations and one controller more is added to make reports (ReportController), like listing users with gmail accounts living in a specific street and pointing in case they are attached to a technology starting with 'React%'.

### Prerequisites
It is neccessary to fill your database configuration at: **sql-sequelize/src/config/database.js**.

<p align="center">
<img src="https://github.com/GuilleAngulo/api-rest/blob/master/sql-sequelize/img/diagram.png" width="420">
</p>

## MongoDB with Mongoose
It makes use of the Node ORM [Mongoose](https://mongoosejs.com/). The structure is again very simple: User, Task and Project. This API provides "forgot password" funcionality by sending by email a generated token to be used when changing the password. This token is stored at the database as well as one expiry time for security reasons (both will be checked at reset password function). Another security measure is the encryption of the password before being stored at the database (using bcrypt module). Finally, the tokens generated (with jwt module) are signed with the "secret" located at **config/auth.json**.

### Prerequisites
- To test the API you will need to connect the project to your database, filling the configuration at: **config/database.json**. 
- Also, in order to send reset password emails, is required to fill the mail configuration document. For testing purpose you can create a free account at [Mailtrap.io](https://mailtrap.io/) and use the configuration parameters at **config/mail.json**. 
- Finally you can choose your own secret to sign the tokens with, at **config/auth.json**.

<p align="center">
<img src="https://github.com/GuilleAngulo/api-rest/blob/master/nosql-mongoose/img/nosql-mongo.png" width="420">
</p>
