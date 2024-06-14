import { deleteToken } from "@/helpers/subscribtionTokens";
import Subscription from "@/models/subscriptionModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const response = NextResponse.next();

  try {
    const { email } = await request.json();
    console.log('Email received for deletion:', email);

    if (!email) {
      console.log('Email is required');
      return NextResponse.json({ error: "email not found" }, { status: 404 })
    }

    //Deleting subscription
    const deleteSubscription = await Subscription.findOneAndDelete({ email });
    console.log('Deleted Subscription:', deleteSubscription);

    if (!deleteSubscription) {
      console.log('Subscription not found');
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    console.log('Subscription deleted successfully');
    // delete token
    deleteToken(response);

    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    response.headers.set('Expires', '0');
    return NextResponse.json({ message: "Subscription and token deleted successfully" });

  } catch (error: any) {
    console.log('Error deleting subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}