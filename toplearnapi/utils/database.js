const mongoose = require("mongoose");

// const { mongouser, mongopass } = process.env;

exports.connectToDB = () => {
    return mongoose.connect("mongodb://localhost/toplearn", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

// exports.connectToDB = () => {
//     return mongoose.connect(`mongodb://${mongouser}:${mongopass}@localhost:27017/ghorbany_db`, {
//         useNewUrlParser: true,
//         useCreateIndex: true
//     });
// };

//'mongodb://localhost:27017/toplearn'
