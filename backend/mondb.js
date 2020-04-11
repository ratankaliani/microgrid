import Mongo from 'mongodb';
const MongoClient = Mongo.MongoClient;
const uri = "mongodb+srv://ratankaliani:micr0gr%21D@cluster0-iasb3.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const db = client.db("Users");
  const collection = db.collection("rights")
  const object = collection.find({rate: 21})
  console.log(object)
//   console.log(collection);
  // perform actions on the collection object
  
  
  client.close();
});
export default { client };