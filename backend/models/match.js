import mongoose from 'mongoose';
import uri from "../mondb.js"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const matchSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fromAddress: {
    type: String,
    require: true
  },
  toAddress: {
    type: String,
    require: true
  },
  totalPrice: {
    type: Number,
    require: true
  },
  energy: {
    type: Number,
    require: true
  },
  initiated: {
    type: Boolean,
    default: false,
    require: true
  },

}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});

export default mongoose.model('Match', matchSchema)
