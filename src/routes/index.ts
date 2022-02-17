import { Router } from 'express';

import usersRoute from './usersRoute';
import genresRoute from './genresRoute';
import moviesRoute from './moviesRoute';
import moviesUsers from './moviesUsersRoute';

const router = Router();

router.use(usersRoute);
router.use(genresRoute);
router.use(moviesRoute);
router.use(moviesUsers);

export default router;
