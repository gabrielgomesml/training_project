import { Router } from 'express';

import usersRoute from './usersRoute';

const router = Router();

router.use(usersRoute);

export default router;
