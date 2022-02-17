import GenresMoviesController from '@controllers/GenresMoviesController';
import { Router } from 'express';
import Authentication from '@middlewares/authentication';

const router = Router();

router
    .route('/genres-movies')
    .post(GenresMoviesController.create)
    .get(Authentication.authenticate, GenresMoviesController.list);

router
    .route('/genres-movies/:id')
    .get(Authentication.authenticate, GenresMoviesController.read)
    .patch(Authentication.authenticate, GenresMoviesController.update)
    .delete(Authentication.authenticate, GenresMoviesController.delete);

router
    .route('/genres-movies-genre-id/:id')
    .get(GenresMoviesController.listByGenreId);

export default router;
