import mongoose from "mongoose";

const addOnSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  monthlyCost: {
    type: Number,
    required: true
  },
  yearlyCost: {
    type: Number,
    required: true
  }
}, { _id: false });

const subscriptionSchema  = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Please enter a name']
  },
  email:{
    type: String,
    required: [true, 'Please enter an email'],
    unique: true
  },
  phoneNo:{
    type: Number | null,
    required: [true, 'Please enter a phone number']
  },
  selectedPlan:{
    type: String,
    required: true
  },
  planCost:{
    type: Number,
    required: true
  },
  billingType:{
    type: String,
    required: true
  },
  // selectedAddOnsDetails:{
  //   type:[addOnSchema],
  //   required: true
  // },
})

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema );
export default Subscription;