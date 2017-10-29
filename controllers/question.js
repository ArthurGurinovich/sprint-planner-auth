import Question from '../models/question';


export async function create(req, res, next){
	const questionData = req.body;

	console.log(req);
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

export async function getAll(req, res, next){
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