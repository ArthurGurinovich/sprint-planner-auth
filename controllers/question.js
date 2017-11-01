import Question from '../models/question';
import User from '../models/user';

export async function createQuestion(req, res, next){
	const questionData = req.body;
	const userId = req.token._id;
	questionData.userId = userId;

	try{
		var question = await Question.create(questionData);
	}catch({ message }){
		return next({
			status: 400,
			message
		});
	}
	res.json(question);
}

export async function getQuestion(req, res, next){
	const _id = req.params.id;
	try{
		var question = await Question.findOne({ _id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}
	res.json(question);
}

export async function updateQuestion(req, res, next){

	const id = req.params.id;
    const questionData = req.body;
	try{
		var question = await Question.update({ _id: id }, {$set: questionData});
		console.log(question);
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	try{
		question = await Question.findOne({ _id: id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	res.json(question);
}	

export async function deleteQuestion(req, res, next){
	const id = req.params.id;
	try{
		var question = await Question.findOne({ _id: id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}
	if(!question){
		return next({
			status: 404,
			message: 'Question not found!'
		});
	}
	try{
		question.remove();
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	return res.json({message: 'Question was deleted'});
}


export async function getAllQuestions(req, res, next){
	try{
		var questions = await Question.find({});
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}
	res.json({questions});
}



export async function getUserQuestions(req, res, next){
	const _login = req.params.username;
	
	try{
		var user = await User.findOne({ login: _login }); 
		console.log(user);
	}catch({ message }){
		return next({
			status: 500,
			message: 'Something went wrong on server side!'
		});
	}

	if(!user){
		return next({
			status: 404,
			message: 'User not found!'
		});
	}

	try{
		var questions = await Question.find({ userId: user._id });
	}catch({ message }){
		return next({
			status: 505,
			message
		});
	}

	res.json({ questions });
}














