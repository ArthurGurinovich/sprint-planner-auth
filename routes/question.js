import express from 'express';

import * as QuestionContoller from '../controllers/question';

const router = express.Router();


router.post('/questions', QuestionContoller.create);
router.get('/questions', QuestionContoller.getAll);

export default router;
