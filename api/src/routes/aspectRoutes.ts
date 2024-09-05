import { Router } from 'express';
import { createAspect, getAspects, updateAspect, deleteAspect } from '../controllers/aspectController';

const router = Router();

router.post('/', createAspect);
router.get('/', getAspects);
router.put('/:id', updateAspect);
router.delete('/:id', deleteAspect);

export default router;

