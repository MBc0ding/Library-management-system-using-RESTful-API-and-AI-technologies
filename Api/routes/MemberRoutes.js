import express from 'express';
import * as MemberController from '../controllers/MemberController.js';

const router = express.Router();

router.get('/', MemberController.getAllMembers); 
router.get('/:id', MemberController.getMemberById); 
router.post('/', MemberController.addMember);
router.put('/:id', MemberController.updateMember); 
router.delete('/:id', MemberController.deleteMember); 
router.post('/authenticate', MemberController.authenticate); 

export default router;
