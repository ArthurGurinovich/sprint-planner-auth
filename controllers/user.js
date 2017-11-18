import User from '../models/user';
import * as UserService from '../services/UserService';

export async function getCurrentUser(req, res, next) {
  const { token } = req;
  
  try {
    var user = await UserService.getUserByToken(token); 
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
  return res.json(user);
}

export async function updateUser(req, res, next){

  const id = req.params.id;
  const userData = req.body;

  try{
    var user = await User.update({ _id: id }, {$set: userData});
    console.log(user);
  }catch({ message }){
    return next({
      status: 500,
      message
    });
  }

  try{
    user = await User.findOne({ _id: id });
  }catch({ message }){
    return next({
      status: 500,
      message
    });
  }

  res.json(user);
} 
