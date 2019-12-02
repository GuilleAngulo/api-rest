const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./app/routes/UserRoutes');
const projectRoutes = require('./app/routes/ProjectRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/project', projectRoutes);

app.listen(3000);