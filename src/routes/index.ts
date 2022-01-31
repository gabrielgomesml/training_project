import { Router } from 'express';

import usersRoute from './usersRoute';
import genresRoute from './genresRoute';

const router = Router();

router.use(usersRoute);
router.use(genresRoute);

export default router;
