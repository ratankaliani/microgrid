import mongoose from 'mongoose';


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
});

export default mongoose.model('UserLogin', userLoginSchema)
