import Mongo from 'mongodb';
const MongoClient = Mongo.MongoClient;
const uri = "mongodb+srv://ratankaliani:micr0gr%21D@cluster0-iasb3.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
export default { client };
// client.connect(err => {
//   const collection = client.db("Users").collection("Login/Password");
//   // perform actions on the collection object
//   const username = collection.find({username: "ratan"});
//   console.log(username);
//   client.close();
// });