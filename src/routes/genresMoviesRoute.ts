import GenresMoviesController from '@controllers/GenresMoviesController';
import { Router } from 'express';

const router = Router();

router
    .route('/genres-movies')
    .post(GenresMoviesController.create)
    .get(GenresMoviesController.list);

router
    .route('/genres-movies/:id')
    .get(GenresMoviesController.read)
    .patch(GenresMoviesController.update)
    .delete(GenresMoviesController.delete);

router
    .route('/genres-movies-genre-id/:id')
    .get(GenresMoviesController.listByGenreId);

export default router;
