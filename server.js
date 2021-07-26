const express = require('express');
const app = express();
const mongoConnection = require('./middlewares/mongodb');
const router = require('./Routes/client.route');
const cors = require("cors");
app.use(cors());
var port = 2800;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const { tokenValidator } = require('./middlewares/tokenValidater');

// app.get('/', (req, res) => {
//     res.send("hello world")
// });


let db;
mongoConnection().then(databaseConnection => {
    db = databaseConnection;
}).catch(error => {
    console.log(error);
    process.exit(1);
})

app.use((req, res, next) => {
    if (!db) {
        mongoConnection().then(database => {
            db = database;
            req.mongoConnection = db;
            next();
        }).catch(err => {
            res.send({ success: false, error: 'Mongo Error!' })
            return;
        })
    }
    req.mongoConnection = db;
    next();
})

//routes modules import 

const client = require('./Routes/client.route')
const user = require('./Routes/user.route')

app.use('/client', client);
app.use('/user', user);
var _routerCapache = app._router;
app.use('/api/a', _routerCapache);
//for test purpose
// app.post('/insert', (req, res) => {
//     let data = {};
//     req.mongoConnection.collection('client').insert({
//         name:"ijj",
//         kol:'389247'
//     })
// })


app.listen(port, () => {
    console.log(`server started at ${port}`)
})