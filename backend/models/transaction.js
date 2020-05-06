import mongoose from 'mongoose';
import uri from "../mondb.js"

//Connect to mongoose
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const transactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  buyer: {
    type: String,
    require: true
  },
  seller: {
    type: String,
    require: false
  },
  totalPrice: {
    type: Number,
    default: 0,
    require: true
  },
  energyAmount: {
    type: Number,
    default: 0,
    require: true
  },
  accepted: {
    type: Boolean,
    default: false,
    require: true
  },
  pricePerShare: {
      type: Number,
      default: 0
  }
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});

export default mongoose.model('Transaction', transactionSchema)
