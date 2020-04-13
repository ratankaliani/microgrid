import mongoose from 'mongoose';
import uri from "../mondb.js"

//Connect to mongoose
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const userLoginSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nonce: {
    type: Number,
    default: Math.floor(Math.random()*10000)
  },
  publicAddress: {
    type: String,
    require: true
  },
  username: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});

export default mongoose.model('UserLogin', userLoginSchema)
