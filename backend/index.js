require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const databaseConnection = require('./db/database');

const app = express();
app.use(cors());
app.use(express.json());

databaseConnection();

app.use('/', require('./routes'));

app.listen(process.env.PORT ?? 3000, () => console.log(`🚀 Backend up on ${process.env.PORT ?? 3000}`));
