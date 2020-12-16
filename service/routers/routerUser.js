const { Router } = require('express'); 
const{ userDBController} = require('../controllers/user.ctrl');

const userRouter = new Router();  

userRouter.get('/', userDBController.getUsers);
userRouter.get('/:id', userDBController.getUserByJob);
userRouter.get('/:id', userDBController.getUserByGender);
userRouter.get('/:id', userDBController.getUserByEmail);
userRouter.post('/', userDBController.addUser);
userRouter.put('/:id', userDBController.updatUser);
userRouter.delete('/:id', userDBController.deleteUser);


module.exports = {userRouter};