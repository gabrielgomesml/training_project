import MoviesUsersController from '@controllers/MoviesUsersController';
import { Router } from 'express';
import Authentication from '../middlewares/authentication';

const router = Router();

router
    .route('/movies-users')
    .post(Authentication.authenticate, MoviesUsersController.create)
    .get(Authentication.authenticate, MoviesUsersController.list);

router
    .route('/movies-users/:id')
    .get(Authentication.authenticate, MoviesUsersController.read)
    .patch(Authentication.authenticate, MoviesUsersController.update)
    .delete(Authentication.authenticate, MoviesUsersController.delete);

router
    .route('/movies-users-user-id')
    .get(Authentication.authenticate, MoviesUsersController.listByUserId);

export default router;
