const { query } = require('express');
const User = require('../Models/users');


let userID = 500;
let data;
exports.userDBController = {

    getUsers(req, res) {


        if (req.query.job) {
            User.find({ job: `${req.query.job}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));

        }

        else if (req.query.gender) {
            User.find({ gender: `${req.query.gender}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }

        else if (req.query.email) {
            User.find({ email: `${req.query.email}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
        
        else{
            User.find({})
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
    }
},

    getUser(req, res) {
    User.findOne({ id: parseInt(req.params.id) })
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));

},

addUser(req, res) {
    ++userID;
    const newUser = new User({
        "id": userID,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "gender": req.body.gender,
        "avatar": req.body.avatar,
        "color": req.body.color,
        "job": req.body.job
    });

    newUser.save()
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));

},

updatUser(req, res) {

    User.updateOne({ id: parseInt(req.params.id) }, req.body)
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));
},

deleteUser(req, res) {
    User.findOneAndDelete({ id: parseInt(req.params.id) })
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));
},
};

