// import { getDbConnection } from "./db";
// import { hasReachedUploadCount } from "./summaries";

// export async function getPriceId(email: string) {
//   const sql = await getDbConnection();
//   const query =
//     await sql`SELECT price_id FROM users where email = ${email} AND status = 'active' `;
//   return query?.[0]?.price_id || null;
// }

// export async function hasReachedUploadLimit(userId: string) {
//   const uploadCount = await hasReachedUploadCount(userId);
//   const priceId = await getPriceId(userId);
//   const plan = pri;
//   const uploadLimit = ispro ? 1000 : 5;
// }
