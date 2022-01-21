import GenresController from '@controllers/GenresController';
import { Router } from 'express';
import Authentication from '@middlewares/authentication';

const router = Router();

router
    .route('/genres')
    .post(Authentication.authenticate, GenresController.create)
    .get(Authentication.authenticate, GenresController.list);

router
    .route('/genres/:id')
    .get(Authentication.authenticate, GenresController.read)
    .patch(Authentication.authenticate, GenresController.update)
    .delete(Authentication.authenticate, GenresController.delete);

export default router;
