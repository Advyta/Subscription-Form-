import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Subscription from '@/models/subscriptionModel';
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, phoneNo, selectedPlan, planCost, billingType, addonsDetails, totalCost } = reqBody;

    const existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      return NextResponse.json({ error: "Subscription already exists" }, { status: 400 });
    }

    const newSubscription = new Subscription({
      name, email, phoneNo, selectedPlan, planCost, billingType, addonsDetails, totalCost
    });

    const savedSubscription = await newSubscription.save();

    const token = jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

    const response = NextResponse.json({
      message: "Subscription created successfully",
      success: true,
      subscription: savedSubscription
    });

    response.cookies.set("token", token, { httpOnly: true });
    // console.log('Generated Token: ' + token)

    // Send email
    await sendEmail({email});

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
