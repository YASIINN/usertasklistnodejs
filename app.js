const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
    //ilgili bağımlılıkların yüklenmesi
const userListRouter = require('./api/routes/userlist');
//ilgili rotanın çağırılması 



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//cors 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(cors())
    //ilgili rotaya gelen isteklerin yönlendirilmesi
app.use('/userlist', userListRouter);

app.use((req, res, next) => {
    const err = new Error('404 Bulunamadı');
    next(err)
})

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        error: {
            msg: error.message
        }
    })
})
module.exports = app;