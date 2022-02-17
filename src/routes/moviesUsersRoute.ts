import MoviesUsersController from '@controllers/MoviesUsersController';
import { Router } from 'express';

const router = Router();

router
    .route('/movies-users')
    .post(MoviesUsersController.create)
    .get(MoviesUsersController.list);

router
    .route('/movies-users/:id')
    .get(MoviesUsersController.read)
    .patch(MoviesUsersController.update)
    .delete(MoviesUsersController.delete);

router
    .route('/movies-users-user-id/:id')
    .get(MoviesUsersController.listByUserId);

export default router;
