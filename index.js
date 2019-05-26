import express from 'express';
import cors from 'cors';
import errorhandler from 'errorhandler';
import ENV from 'dotenv';
import routes from './routes';
import './config/passport';


ENV.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (!isProduction) {
  app.use(errorhandler());
}

app.use(routes);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Tugure Platform' });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res, next) => {
    if (err.message === 'Failed to fetch user profile') {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: `${err.message}, please check your connection`
        }
      });
    }

    if (err.message === 'Invalid Credentials') {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: `${err.message}, access denied, please sign in again`
        }
      });
    }
    next();
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
  next();
});

// Create or Update database tables and start express server
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

export default app;
