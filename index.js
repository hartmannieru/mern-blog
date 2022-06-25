import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { registerValidation } from './validations/aut.js';

mongoose
  .connect('mongodb+srv://admin:wwwwww@cluster0.tzq99.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Database OK'))
  .catch((err) => console.log('Database Error', err));

const app = express();
app.use(express.json());

app.post('/auth/register', (req, res) => {});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
