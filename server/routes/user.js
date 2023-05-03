import express from 'express';
import { registerUser, authenticateUser, addMovieToFavorite } from "../controllers/user.js";
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',authenticateUser);
router.post('/addFav',addMovieToFavorite);

export default router;