import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/user';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

userRoute(app);

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


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
