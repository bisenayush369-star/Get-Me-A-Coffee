"use client";

import React, { useState } from "react";
import Script from "next/script";

const PaymentPage = ({ username, currentUser }) => {
  // ✅ Correct hooks
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const handleChange = (e) => {
    setPaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    });
  };

  const pay = async (amount) => {
    try {
      if (!razorpayReady) {
        alert("Razorpay is loading, wait 1 second");
        return;
      }

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          username: currentUser?.username || username,
          paymentform,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("❌ API error:", err);
        return;
      }

      const order = await res.json();

      if (!order?.id) {
        console.error("❌ Order ID missing");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Get Me A Coffee",
        description: "Support Payment",
        order_id: order.id,
        prefill: {
          name: paymentform.name || "Anonymous",
        },
        theme: { color: "#7c3aed" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ PAYMENT ERROR:", err);
      alert("Payment failed. Check console.");
    }
  };

  return (
    <>
      {/* ✅ Razorpay script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Razorpay loaded");
          setRazorpayReady(true);
        }}
      />

      <div className="flex flex-col gap-3 w-full">
        <input
          type="text"
          name="name"
          value={paymentform.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full bg-slate-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
        />

        <input
          type="text"
          name="message"
          value={paymentform.message}
          onChange={handleChange}
          placeholder="Enter Message"
          className="w-full bg-slate-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
        />

        <input
          type="number"
          name="amount"
          value={paymentform.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          className="w-full bg-slate-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
        />

        <button
          type="button"
          onClick={() => pay(Number(paymentform.amount))}
          className="w-full mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500
                     hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Pay
        </button>

        <div className="flex gap-2 flex-wrap justify-center">
          <button onClick={() => pay(10)} className="flex-1 min-w-[80px] bg-slate-800 px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
            Pay $10
          </button>
          <button onClick={() => pay(20)} className="flex-1 min-w-[80px] bg-slate-800 px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
            Pay $20
          </button>
          <button onClick={() => pay(30)} className="flex-1 min-w-[80px] bg-slate-800 px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
            Pay $30
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
