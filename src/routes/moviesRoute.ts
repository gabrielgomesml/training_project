import MoviesController from '@controllers/MoviesController';
import { Router } from 'express';

const router = Router();

router
    .route('/movies')
    .post(MoviesController.create)
    .get(MoviesController.list);

router
    .route('/movies/:id')
    .get(MoviesController.read)
    .patch(MoviesController.update)
    .delete(MoviesController.delete);

export default router;
