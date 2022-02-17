import GenresController from '@controllers/GenresController';
import { Router } from 'express';

const router = Router();

router
    .route('/genres')
    .post(GenresController.create)
    .get(GenresController.list);

router
    .route('/genres/:id')
    .get(GenresController.read)
    .patch(GenresController.update)
    .delete(GenresController.delete);

export default router;
