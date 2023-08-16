import express from 'express';
import { idNotFound } from './middleware/index.js';
import { moviesRouter } from './routes/movies.js';

const app = express();
const PORT = process.env.PORT ?? 7070;

// Middleware
app.disable('x-powered-by');
app.use(express.json());
app.get('/movies/:id', idNotFound);
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
