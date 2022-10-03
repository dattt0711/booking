
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_HOST = process.env.MONGODB_HOST || '127.0.0.1';
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME || '/booking'; //phui-booking-db pass:phuihanoi
const MONGODB_URI = `mongodb+srv://phui-booking-db:phuihanoi@phui-booking-db.slwzudu.mongodb.net/?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const Promise = require('bluebird');

const database = [];
mongoose.Promise = Promise;
mongoose.dbs = {};
var gfs = null;
(async () => {
    async function connectDb() {
        try {
            const options = {
                autoIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
            mongoose.connection.once("open", function () {
                gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'images'});
           })
            await mongoose.connect(MONGODB_URI, options);   
            console.log('connected to system database!');    
            return Promise.resolve({connection:mongoose.connection});
        } catch (err) {
            return Promise.reject(err);
        }
    }
    const connected = await connectDb();
    module.exports = gfs;
})();
