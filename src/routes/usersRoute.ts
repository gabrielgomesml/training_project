import UsersController from '@controllers/UsersController';
import { Router } from 'express';

const router = Router();

router.route('/users').post(UsersController.create).get(UsersController.list);

router
    .route('/users/:id')
    .get(UsersController.read)
    .patch(UsersController.update)
    .delete(UsersController.delete);

export default router;
