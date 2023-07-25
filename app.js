require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { errorMiddleware } = require('./utils/errorMiddleware');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const DB_URL = process.env.NODE_ENV !== 'production' ? 'mongodb://127.0.0.1:27017/bitfilmsdb' : process.env.DB_URL;

const app = express();
app.use(express.json());
mongoose.connect(DB_URL);
app.use(cookieParser());
app.use(requestLogger);

app.use(cors({
  credentials: true,
  origin: [
    'https://api.moviexp.rpoltorakov.nomoredomains.xyz',
    'https://moviexp.rpoltorakov.nomoredomains.xyz',
  ],
}));

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT);
