import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Subscription from '@/models/subscriptionModel'

connect();

export async function POST(request: NextRequest) {

  try {
    const reqBody = await request.json();
    const {
      name,
      email,
      phoneNo,
      selectedPlan, 
      billingType, 
      // selectedAddOnsDetails 
    } = reqBody;
    console.log('Received data:', reqBody);

    // Check if subscription already exists
    const existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      console.error('Subscription already exists for email:', email);
      return NextResponse.json({ error: "Subscription already exists" }, { status: 400 });
    }

    // Create new subscription
    const newSubscription = new Subscription({
      name,
      email,
      phoneNo,
      selectedPlan,
      billingType,
      // selectedAddOnsDetails 
    });

    const savedSubscription = await newSubscription.save();

    console.log('Subscription saved:', savedSubscription);

    return NextResponse.json({
      message: "Subscription created successfully",
      success: true,
      subscription: savedSubscription
    });

  } catch (error: any) {
    // if (error.name === 'ValidationError') {
    //   console.error('Mongoose validation error:', error.message);
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }

    console.error('Error: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}