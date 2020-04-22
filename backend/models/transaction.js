import mongoose from 'mongoose';
import uri from "../mondb.js"

//Connect to mongoose
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const userLoginSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fromAddress: {
    type: String,
    require: true
  },
  toAddress: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    default: '',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
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

export default mongoose.model('Transaction', transactionSchema)
