import UsersController from '@controllers/UsersController';
import AuthController from '@controllers/AuthController';
import { Router } from 'express';
import Authentication from '../middlewares/authentication';

const router = Router();

router
    .route('/users')
    .post(UsersController.create)
    .get(Authentication.authenticate, UsersController.list);

router
    .route('/users/:id')
    .get(Authentication.authenticate, UsersController.read)
    .patch(Authentication.authenticate, UsersController.update)
    .delete(Authentication.authenticate, UsersController.delete);

router.route('/user-auth').post(AuthController.authenticateUser);
router.route('/verify-token').post(AuthController.verifyToken);

export default router;
