import MoviesController from '@controllers/MoviesController';
import { Router } from 'express';
import Authentication from '@middlewares/authentication';

const router = Router();

router
    .route('/movies')
    .post(Authentication.authenticate, MoviesController.create)
    .get(MoviesController.list);

router
    .route('/movies/:id')
    .get(Authentication.authenticate, MoviesController.read)
    .patch(Authentication.authenticate, MoviesController.update)
    .delete(Authentication.authenticate, MoviesController.delete);

export default router;
