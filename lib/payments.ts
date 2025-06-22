import Stripe from "stripe";
import { getDbConnection } from "./db";

export default async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  try {
    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    const priceId = (session.line_items?.data[0]?.price?.id || "") as string;

    if ("email" in customer && priceId) {
      const { email, name } = customer;

      await createOrUpdateUser({
        email: email as string,
        fullName: name as string,
        customerId,
        priceId,
        status: "active",
      });

      await createPayment({
        session,
        priceId: priceId as string,
        userEmail: email as string,
      });

      console.log(`✅ User processed: ${email}`);
    } else {
      console.warn("⚠️ Customer email or priceId missing in session");
    }
  } catch (error) {
    console.error("❌ Failed in handleCheckoutSessionCompleted:", error);
  }
}

export async function createOrUpdateUser({
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const sql = await getDbConnection();

    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length === 0) {
      await sql`
        INSERT INTO users (email, full_name, customer_id, price_id, status)
        VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})
      `;
      console.log(`✅ User created: ${email}`);
    } else {
      await sql`
        UPDATE users
        SET full_name = ${fullName},
            customer_id = ${customerId},
            price_id = ${priceId},
            status = ${status}
        WHERE email = ${email}
      `;
      console.log(`🔄 User updated: ${email}`);
    }
  } catch (error) {
    console.error("❌ Error in createOrUpdateUser:", error);
  }
}

async function createPayment({
  session,
  priceId,
  userEmail,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const sql = await getDbConnection();
    const { amount_total, id, status } = session;

    await sql`
      INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
      VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})
    `;

    console.log(`💸 Payment recorded: ${id}`);
  } catch (error) {
    console.error("❌ Error creating payment:", error);
  }
}

// export async function handleSubscriptionDeleted({
//   subscriptionId,
//   stripe,
// }: {
//   subscriptionId: string;
//   stripe: Stripe;
// }) {
//   console.log("⚠️ Subscription Deleted:", subscriptionId);

//   try {
//     // Retrieve subscription details
//     const subscription = await stripe.subscriptions.retrieve(subscriptionId);
//     const customerId = subscription.customer as string;

//     // Retrieve customer details
//     const customer = await stripe.customers.retrieve(customerId);
//     const email = "email" in customer ? customer.email : null;

//     const sql = await getDbConnection();

//     // First try to update by email if present
//     if (email) {
//       await sql`
//         UPDATE users
//         SET status = 'canceled'
//         WHERE email = ${email}
//       `;
//       console.log(`🛑 Subscription canceled for ${email}`);
//     } else {
//       // Fallback: update by customer_id
//       await sql`
//         UPDATE users
//         SET status = 'canceled'
//         WHERE customer_id = ${customerId}
//       `;
//       console.log(`🛑 Subscription canceled for customer_id: ${customerId}`);
//     }
//   } catch (error) {
//     console.error("❌ Error handling subscription deleted:", error);
//   }
// }

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  console.log("⚠️ Subscription Deleted:", subscriptionId);

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customerId = subscription.customer as string;

    const sql = await getDbConnection();

    // Find the user using customerId from your own DB
    const user = await sql`
      SELECT email FROM users WHERE customer_id = ${customerId}
    `;

    if (!user || user.length === 0) {
      console.warn("⚠️ No user found with customer_id:", customerId);
      return;
    }

    const email = user[0].email;

    // Update user’s status to 'canceled'
    await sql`
      UPDATE users
      SET status = 'canceled'
      WHERE email = ${email}
    `;

    console.log(`🛑 Subscription canceled — user status updated for ${email}`);
  } catch (error) {
    console.error("❌ Error handling subscription deleted:", error);
  }
}
