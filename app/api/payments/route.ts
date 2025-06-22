import handleCheckoutSessionCompleted from "@/lib/payments";
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

  try {
    if (!signature) {
      throw new Error("Missing stripe-signature header.");
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret as string
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const sessionId = (event.data.object as Stripe.Checkout.Session).id;

        // Expand line items (note: fixed typo 'line_iems' → 'line_items')
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("⚠️ Subscription canceled:", subscription);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
