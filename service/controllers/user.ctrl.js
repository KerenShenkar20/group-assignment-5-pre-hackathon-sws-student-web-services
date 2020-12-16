const User = require('../Models/users');

const userID = 500;
exports.userDBController = {

    getUsers(req, res){  
                     
        if(req.query) 
        {
            User.find({}) 
                .then(docs => {res.json(docs)})
                .catch(err => console.log(`Error getting the data from DB: ${err}`));    
        }
        
        
        if(req.query.job) 
            {
                User.find({job: `${req.query.job}`})            
                    .then(docs => {res.json(docs)})
                    .catch(err => console.log(`Error getting the data from DB: ${err}`));
                console.log(req.query.job) ;   

            }

        if( req.query.gender) 
            {
                User.find({gender: `${req.query.gender}`})            
                    .then(docs => {res.json(docs)})
                    .catch(err => console.log(`Error getting the data from DB: ${err}`));
            }

        if( req.query.email )
            {
                User.find({email: `${req.query.email}`})            
                .then(docs => {res.json(docs)})
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
            } 

    },

    addUser(req, res){
        let newUser = new User({
            "id":++userID,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "gender":req.body.gender,
            "avatar": req.body.avatar,
            "color":req.body.color,
            "job":req.body.job 
        });
        //const result = newUser.save();
        //if(result){res.json(result)}
        newUser.save()
        .then(docs => {res.json(docs)})
        .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    updatUser(req, res){
        const info = req.body
        User.updateOne({id: parseInt(req.params.id)}, info) 
            .then(docs => {res.json(docs)})
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    deleteUser(req, res){
        User.deleteOne({id: parseInt(req.params.id)})
            .then(docs => {res.json(docs)})
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
};

