const mongoose = require ('mongoose')

const connectDb = async () =>{
    try {
        const conn =await mongoose.connect(process.env.MONGO_URL)
        console.log(`Server Running On ${conn.connection.host} `);
    } catch (error) {
        console.log(`Error in mongodb ${error}`);
        
    }
};


module.exports = connectDb;