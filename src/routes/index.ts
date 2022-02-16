import { Router } from 'express';

import usersRoute from './usersRoute';
import genresRoute from './genresRoute';
import moviesRoute from './moviesRoute';

const router = Router();

router.use(usersRoute);
router.use(genresRoute);
router.use(moviesRoute);

export default router;
