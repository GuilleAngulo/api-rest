# API REST
The project is composed of two different APIs REST. One is based on a SQL database (Postgres) and the other on a NoSQL database (Mongodb).

## SQL with Sequelize
It makes use of the Node ORM [Sequelize](https://sequelize.org/). The schema is very simple, only three entities: User, Address and Tech. The one-to-many (User-Address) and many-to-many (User-Tech) relationships are covered. Each controller have all the CRUD operations and one controller more is added to make reports (ReportController), like listing users with gmail accounts living in a specific street and pointing in case they are attached to a technology starting with 'React%'.

<img src="https://github.com/GuilleAngulo/api-rest/blob/master/sql-sequelize/img/diagram.png" width="420" style="align-items:center;">


## NoSQL with Mongoose

