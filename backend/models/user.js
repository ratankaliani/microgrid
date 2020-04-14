import mongoose from 'mongoose';
import uri from "../mondb.js"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = mongoose.Schema({
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
  consumption: {
    model: {type: String, default: "linear", require: true},
    slope: {type: Number, default: 3},
    upperBound: {type: Number},
    lowerBound: {type: Number},
    period: {type: Number},
    amplitude: {type: Number},
    step: {type: Number},
  },
  production: {
    model: {type: String, default: "linear", require: true},
    slope: {type: Number, default: 2},
    period: {type: Number},
    amplitude: {type: Number},
    step: {type: Number},
  },
  producer: {
    type: Boolean,
    default: false,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});

export default mongoose.model('User', userSchema)
