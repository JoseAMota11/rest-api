import { Router } from 'express';
import { getMovies } from '../utils/index.js';
import { validateMovies, validatePartialMovies } from '../schemas/movies.js';

export const moviesRouter = Router();
const movies = getMovies();

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query;

  if (genre) {
    const filteredMovies = movies.filter(({ genre: movieGenre }) =>
      movieGenre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );

    res.json(filteredMovies);
    return;
  }

  res.json(movies);
});

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundedMovie = movies.find(({ id: movieId }) => movieId === id);
  res.json(foundedMovie);
});

moviesRouter.post('/', (req, res) => {
  const result = validateMovies(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

moviesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const resultValidation = validatePartialMovies(req.body);
  const movieIndex = movies.findIndex(({ id: movieId }) => movieId === id);

  if (resultValidation.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const newMovie = {
    ...movies[movieIndex],
    ...resultValidation.data,
  };

  movies[movieIndex] = newMovie;
  res.status(201).json(newMovie);
});
