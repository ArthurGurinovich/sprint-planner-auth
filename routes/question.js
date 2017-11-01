import express from 'express';

import * as QuestionController from '../controllers/question';

const router = express.Router();

router.post('/questions', QuestionController.createQuestion);
router.get('/questions/:id', QuestionController.getQuestion);

router.put('/questions/:id', QuestionController.updateQuestion);
router.delete('/questions/:id', QuestionController.deleteQuestion);

router.get('/questions', QuestionController.getAllQuestions);
router.get('/questions/user/:username', QuestionController.getUserQuestions);


export default router;
