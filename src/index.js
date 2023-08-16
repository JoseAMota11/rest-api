import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

const whitelist = ['http://localhost:4040'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Middleware
app.get('/movies', cors(corsOptions), function (req, res, next) {
  res.json({ message: 'This is CORS-enabled for a whitelisted domain.' });
});

app.get('/movies', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
