import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/user';
import multer from 'multer';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(upload.array()); 
app.use(express.static('public'));

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to database');
});

app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
