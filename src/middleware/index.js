import { getMovies } from '../utils/index.js';

export const idNotFound = (req, res, next) => {
  const movies = getMovies();
  const { id } = req.params;
  const searchId = movies.some(({ id: movieId }) => movieId === id);

  if (searchId) {
    next();
    return;
  }

  res.status(404).json({ message: `There is no movie with id '${id}'` });
};
