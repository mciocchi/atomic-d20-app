import { Router } from 'express';
import { createSkill, getSkills, updateSkill, deleteSkill } from '../controllers/skillController';

const router = Router();

router.post('/', createSkill);
router.get('/', getSkills);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;

