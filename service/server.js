
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const orderRouter = require("./routers/routerUser");


//.......................Morgan...........................................
// const morgan = require('morgan');
// const moment = require('moment');
// const colors = require('colors');

// const fs = require('fs');
// const file = fs.createWriteStream("./logs.txt", {flags:'a'});

// morgan.token('date',() => {
//     return moment().format('YYYY-MM-DD, HH:mm a');
// });

// app.use(morgan('dev'));
// app.use(morgan(':date'));
// app.use(morgan(':method :url :status :response-time ms - :date' , {stream : file}));

//.......................Morgan..........................................


app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use('/api/users', routersUser.routersUser);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
   });


app.listen(port, () => console.log('Express server is running on port ', port));