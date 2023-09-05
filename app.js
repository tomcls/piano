const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require("body-parser");
var cors = require('cors')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require("jsonwebtoken")

const metricListRouter = require('./routes/metric/list');
const metricAddRouter = require('./routes/metric/add');


const app = express();
app.use(cors())
app.use(logger('dev'));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', validateToken);

app.use('/metric/list', metricListRouter);
app.use('/metric/add', metricAddRouter);

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
function validateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (req.path.indexOf('/public/') >= 0 || req.path === '/users/login' || 
        req.path === '/users/request-password' ||
        req.path === '/users/reset-password' ) return next();
    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    if (token == null) return res.status(400).json({error:"Authorization not present"});
    jwt.verify(token, process.env.API_SECRET, (err, user) => {
        if (err) {
            console.log(err);
           return res.status(403).json({error:"Authorization not valid"});
        }
        else {
            next() //proceed to the next action in the calling function
        }
    }) //end of jwt.verify()*/
}
