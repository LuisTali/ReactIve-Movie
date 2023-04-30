import express from 'express';
import { getLatestMovies, getPopularMovies, getMovieById, getRelatedMovies } from '../controllers/movies.js';
const router = express.Router();

router.get('/',getLatestMovies);
router.get('/popular', getPopularMovies);
router.get('/movie/:id',getMovieById);
router.get('/related/:id',getRelatedMovies);

export default router;