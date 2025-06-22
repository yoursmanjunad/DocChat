import React from "react";
import { Button } from "@/components/ui/button";
import { Pricingplans } from "@/utils/constants";

// Update your actual Stripe Checkout URLs here

function PricingCard({
  title,
  price,
  list,
  checkoutUrl,
  highlight = false,
}: {
  title: string;
  price: number;
  list: string[];
  checkoutUrl: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative border rounded-2xl shadow-md p-6 w-full max-w-sm bg-white flex flex-col justify-between transition-transform duration-300 ${
        highlight
          ? "border-indigo-500 scale-105 ring-1 ring-indigo-300"
          : "border-gray-200"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          Most Popular
        </span>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
        <p className="text-3xl font-bold text-center mb-4">${price}/mo</p>
        <ul className="mb-6 space-y-2 text-sm text-gray-600">
          {list.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </div>

      {/* Button wrapped in <a> to redirect to Stripe checkout */}
      <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
        <Button
          className={`w-full ${
            highlight ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""
          }`}
        >
          Choose {title}
        </Button>
      </a>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Pricing</h2>
          <p className="text-gray-600 mt-2">
            Choose a plan that fits your needs
          </p>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {Pricingplans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
