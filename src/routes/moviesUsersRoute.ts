import MoviesUsersController from '@controllers/MoviesUsersController';
import { Router } from 'express';
import Authentication from '@middlewares/authentication';

const router = Router();

router
    .route('/movies-users')
    .post(MoviesUsersController.create)
    .get(Authentication.authenticate, MoviesUsersController.list);

router
    .route('/movies-users/:id')
    .get(Authentication.authenticate, MoviesUsersController.read)
    .patch(Authentication.authenticate, MoviesUsersController.update)
    .delete(Authentication.authenticate, MoviesUsersController.delete);

router
    .route('/movies-users-user-id/:id')
    .get(MoviesUsersController.listByUserId);

export default router;
