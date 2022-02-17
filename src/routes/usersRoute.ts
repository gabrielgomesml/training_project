import UsersController from '@controllers/UsersController';
import AuthController from '@controllers/AuthController';
import { Router } from 'express';

const router = Router();

router.route('/users').post(UsersController.create).get(UsersController.list);

router
    .route('/users/:id')
    .get(UsersController.read)
    .patch(UsersController.update)
    .delete(UsersController.delete);

router.route('/user-auth').post(AuthController.authenticateUser);
router.route('/verify-token').post(AuthController.verifyToken);

export default router;
