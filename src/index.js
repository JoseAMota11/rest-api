import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 6060;

// Middleware
app.use(cors());

app.get('/movies', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
