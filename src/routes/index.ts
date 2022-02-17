import { Router } from 'express';

import usersRoute from './usersRoute';
import genresRoute from './genresRoute';
import moviesRoute from './moviesRoute';
import moviesUsers from './moviesUsersRoute';
import genresMovies from './genresMoviesRoute';

const router = Router();

router.use(usersRoute);
router.use(genresRoute);
router.use(moviesRoute);
router.use(moviesUsers);
router.use(genresMovies);

export default router;
