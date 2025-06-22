export const Pricingplans = [
  {
    id: "basic",
    title: "Basic",
    price: 99,
    checkoutUrl:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_eVq4gs0ATeMj3aNaib08g01"
        : "", // replace with your actual URL
    list: ["5 summaries per month", "Best for occasional use"],
  },
  {
    id: "pro",
    title: "Pro",
    price: 199,
    checkoutUrl:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_fZuaEQfvNcEb4eR61V08g00"
        : "", // replace with your actual URL
    list: ["Unlimited summaries", "Priority processing", "Email support"],
    highlight: true,
  },
];
