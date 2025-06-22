import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_API_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeApiKey || !webhookSecret) {
  throw new Error("STRIPE_API_KEY or STRIPE_WEBHOOK_SECRET is missing in .env");
}

const stripe = new Stripe(stripeApiKey);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    if (!signature) {
      throw new Error("Missing stripe-signature header.");
    }

    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret as string
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Checkout session completed:", session);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("Customer subscription deleted:", subscription);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ status: "success" });
}
