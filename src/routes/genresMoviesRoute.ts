import GenresMoviesController from '@controllers/GenresMoviesController';
import { Router } from 'express';
import Authentication from '../middlewares/authentication';

const router = Router();

router
    .route('/genres-movies')
    .post(Authentication.authenticate, GenresMoviesController.create)
    .get(Authentication.authenticate, GenresMoviesController.list);

router
    .route('/genres-movies/:id')
    .get(Authentication.authenticate, GenresMoviesController.read)
    .patch(Authentication.authenticate, GenresMoviesController.update)
    .delete(Authentication.authenticate, GenresMoviesController.delete);

router
    .route('/genres-movies-genre-id/:id')
    .get(Authentication.authenticate, GenresMoviesController.listByGenreId);

export default router;
