import express from 'express';
import * as MemberController from '../controllers/MemberController.js';

const router = express.Router();

router.get('/', MemberController.getAllMembers); // GET /members
router.get('/:id', MemberController.getMemberById); // GET /members/:id
router.post('/', MemberController.addMember); // POST /members
router.put('/:id', MemberController.updateMember); // PUT /members/:id
router.delete('/:id', MemberController.deleteMember); // DELETE /members/:id

export default router;
