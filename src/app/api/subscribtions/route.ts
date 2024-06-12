import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Subscription from '@/models/subscribtionModel';
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {

  try {
    const reqBody = await request.json();
    const {
      name,
      email,
      phoneNo,
      selectedPlan,
      planCost,
      billingType,
      addonsDetails
    } = reqBody;

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
      planCost,
      billingType,
      addonsDetails
    });

    const savedSubscription = await newSubscription.save();

    const token = jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: "1h" })

    const response = NextResponse.json({
      message: "Subscription created successfully",
      success: true,
      subscription: savedSubscription
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;

  } catch (error: any) {
    console.error('Error: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}