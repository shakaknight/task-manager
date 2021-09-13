//This file will handle connection to mongo db database.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager',{ useNewUrlParser: true }).then(()=>{
    console.log("Connected to mongo db");
}).catch((e)=>{
    console.log("Error while connecting to the database");
    console.log(e);
});

// To prevent deprectation warnings (from MongoDB native driver)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);


module.exports = {
    mongoose
};