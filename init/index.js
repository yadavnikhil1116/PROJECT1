const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

main().then((res) =>{
    console.log('Connected to db!!!!');
}).catch((err) => {
    console.log("Error in connection");
});

async function main(){  
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '66b8eefcfa695e240f5d6a09'}));
    await Listing.insertMany(initData.data);
    console.log('Data Saved!!!!');
};

initDB();