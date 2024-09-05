import { Router } from 'express';
import { createManeuver, getManeuvers, updateManeuver, deleteManeuver } from '../controllers/maneuverController';

const router = Router();

router.post('/', createManeuver);
router.get('/', getManeuvers);
router.put('/:id', updateManeuver);
router.delete('/:id', deleteManeuver);

export default router;

