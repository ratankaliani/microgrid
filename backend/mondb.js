import Mongo from 'mongodb';
import mongoose from 'mongoose';
const MongoClient = Mongo.MongoClient;
const uri = "mongodb+srv://ratankaliani:bL0cK%3Fp4rT%2A@cluster0-iasb3.mongodb.net/Microgrid?retryWrites=true&w=majority?authSource=admin";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   if (err) throw err;
//   const dbo = client.db("Users");
//   var query = {};
//   dbo.collection("Login/Password").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
    
//   });
//   client.close();
// });



export default uri;