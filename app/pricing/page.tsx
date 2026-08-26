import { PricingTable } from "@clerk/nextjs";
import React from "react";

function Pricing() {
  return (
    <div className="mt-20">
      <h2 className="font-bold text-3xl text-center my-5">
        Ai-Powered Trip Planning - Pick Your Plan
      </h2>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "0 1rem" }}>
        <PricingTable />
      </div>
    </div>
  );
}

export default Pricing;
