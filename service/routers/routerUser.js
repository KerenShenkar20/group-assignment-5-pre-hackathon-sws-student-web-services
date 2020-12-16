const { Router } = require('express'); 
const{ userDBController} = require('../controllers/user.ctrl');

const userRouter = new Router();  

userRouter.get('/', userDBController.getUsers);
userRouter.post('/', userDBController.addUser);
userRouter.put('/:id', userDBController.updatUser);
userRouter.delete('/:id', userDBController.deleteUser);


module.exports = {userRouter};