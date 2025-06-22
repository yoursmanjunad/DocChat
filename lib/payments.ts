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

// 🧾 Insert Payment Record
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
