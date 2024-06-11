import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Subscription from '@/models/subscriptionModel'

connect();

export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, phoneNo, selectedPlan, billingType, selectedAddOns } = reqBody;

     // Check if subscription already exists
     const existingSubscription = await Subscription.findOne({ email });

     if (existingSubscription) {
      return NextResponse.json({error: "Subscription already exists"}, {status: 400});
     }

     // Create new subscription
    const newSubscription = new Subscription({
      name,
      email,
      phoneNo,
      selectedPlan,
      billingType,
      selectedAddOns
    });

    const savedSubscription = await newSubscription.save();

    return NextResponse.json({
      message: "Subscription created successfully",
      success: true,
      subscription: savedSubscription
    });

  } catch (error: any) {
    console.log(error);
    
    return NextResponse.json({error: error.message}, {status: 500});
  }
}