const { query } = require('express');
const User = require('../Models/users');


exports.userDBController = {

    getUsers(req, res) {
        User.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    getUser(req, res) {
        User.findOne({ id: parseInt(req.params.id) })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));

    },

    addUser(req, res) {
        const newUser = new User({
            "id": req.body._id,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "gender": req.body.gender,
            "avatar": req.body.avatar,
            "color": req.body.color,
            "job": req.body.job,
        })

        const result = newUser.save();
        if (result) {
            res.json(result)
        }
        else {
            res.status(404).send("Error saving a user");
        }
    },

    updatUser(req, res) {

        const info = req.body
        User.updateOne({ id: req.params.id }, info)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));

    },

    deleteUser(req, res) {
        User.deleteOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));

    }
};

