// const require = createRequire(import.meta.url);
const mongoose = require("mongoose") ;
const dotenv = require("dotenv");
dotenv.config();

const mongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
      console.log("Connected to MongoDB");

    //perform operations on the database
      const fetched_data = (await mongoose.connection.db.collection("food_items").find({}).toArray()).sort((a, b) => a.name.localeCompare(b.name));
      global.fooditems = fetched_data;
    
      const foodCategory = (await mongoose.connection.db.collection("foodCategory").find({}).toArray());
      global.food_category = foodCategory;
    
    } catch (error) {
      console.log(process.env.MONGO_URI);
      console.log("Error connecting to MongoDB:", error);
    }
}  

module.exports = mongoDB;