const MongoClient = require('mongodb');
const uri = "mongodb+srv://vamsi:Iam1robot@sandbox.768fe.mongodb.net/codementor?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });


module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        resolve(connection);
    })
}

connect = () => {
    return new Promise(async (resolve, reject) => {
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, connection) => {
            if (err) {
                console.log(err);
                process.exit(1);
                resolve(err)
            } else {
                mongoConnection = connection.db('personal');
                resolve(mongoConnection);
            }
        })
    })
}