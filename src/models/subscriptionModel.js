import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true
  },
  phoneNo: {
    type: Number,
    required: [true, 'Please enter a phone number']
  },
  selectedPlan: {
    type: String,
    required: true
  },
  planCost: {
    type: Number,
    required: true
  },
  billingType: {
    type: String,
    required: true
  },
  addonsDetails: {
    type: [{
      name: String,
      description: String,
      cost: Number
    }],
    required: true
  },
  totalCost:{
    type: Number,
    required: true
  }
});

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema );
export default Subscription;