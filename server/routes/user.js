import express from 'express';
import { registerUser, authenticateUser, addMovieToFavorite, removeMovieFromFavorite } from "../controllers/user.js";
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',authenticateUser);
router.post('/addFav',addMovieToFavorite);
router.post('/removeFav',removeMovieFromFavorite);

export default router;