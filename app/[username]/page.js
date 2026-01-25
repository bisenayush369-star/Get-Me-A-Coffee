"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Script from "next/script"
import { initiate } from "../../actions/useractions"
import toast from "react-hot-toast";

const DEFAULT_COVER =
  "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/19.gif?token-hash=Dyjc4niYwtydJ9nNsxLRdNNFB96cW4JEO6z1qutvohs%3D&token-time=1770163200"

const DEFAULT_PROFILE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10"

  const savePayment = async (data) => {
  await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

const Username = () => {
  const { username } = useParams()
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
  const [currentUser, setCurrentUser] = useState({})
  const [payments, setPayments] = useState([]);
  const totalPayments = payments.length;

const totalRaised = payments.reduce(
  (sum, p) => sum + Number(p.amount || 0),
  0
);

const [user, setUser] = useState(null)
const [firstVisitToastShown, setFirstVisitToastShown] = useState(false);

useEffect(() => {
  const loadPayments = async () => {
    try {
      const res = await fetch(`/api/payments?username=${username}`);
      const data = await res.json();
      setPayments(data || []);

if (
  (data?.length ?? 0) === 0 &&
  !firstVisitToastShown &&
  !localStorage.getItem(`first-visit-${username}`)
) {

  toast.custom(
    (t) => (
      <div className="bg-white text-slate-900 px-4 py-3 rounded-lg shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span>👋</span>
          <span className="font-medium">
            No payments yet — share your page to get your first supporter!
          </span>
        </div>

        <div className="absolute bottom-0 left-0 h-0.75 w-full bg-slate-200">
          <div className="h-full bg-linear-to-r from-purple-600 to-blue-500 animate-toast-progress" />
        </div>
      </div>
    ),
    { duration: 4000 }
  );

  setFirstVisitToastShown(true);
  localStorage.setItem(`first-visit-${username}`, "true");

}

    } catch (err) {
      console.error("Failed to load payments", err);
    }
  };

  if (username) loadPayments();
}, [username, firstVisitToastShown]);                                 

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/profile?username=${username}`)

      if (!res.ok) {
        console.error("API error:", res.status)

        const totalPayments = payments.length;

const totalRaised = payments.reduce(
  (sum, p) => sum + Number(p.amount || 0),
  0
);

        return
      }

      const text = await res.text()
      if (!text) {
        console.warn("Empty response from API")
        return
      }

      const data = JSON.parse(text)
      setUser(data)
    } catch (err) {
      console.error("Fetch user failed:", err)
    }
  }

  if (username) fetchUser()
}, [username, payments])


  const pay = async (amount) => {
  toast.loading("Opening payment gateway...", { id: "pay" });
  try {

    console.log("PAY CLICKED:", amount)

    if (!window.Razorpay) {
      toast.error("Razorpay not loaded", { id: "pay" });
      return
    }

    // ✅ CREATE ORDER FIRST
    const order = await initiate(amount, String(username), paymentform)

    if (!order || !order.id) {
      toast.error("Order failed", { id: "pay" });
      return
    }

    // ✅ THEN OPEN RAZORPAY
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Get Me A Coffee",
      order_id: order.id,

      prefill: {
        name: paymentform.name || "Supporter",
      },

      theme: { color: "#7c3aed" },

      handler: async function (response) {
  toast.loading("Confirming payment...", { id: "pay" });

  await fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: String(username),
            name: paymentform.name || "Supporter",
            message: paymentform.message || "",
            amount: amount,
            razorpayPaymentId: response.razorpay_payment_id,
          }),
        });

      const res = await fetch(`/api/payments?username=${username}`);
const data = await res.json();
setPayments(data || []);

// toast.success("Payment successful 🎉", { id: "pay" });
toast.custom(
  (t) => (
    <div
      className={`bg-white text-slate-900 px-4 py-3 rounded-lg shadow-lg relative overflow-hidden ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <div className="flex items-center gap-2">
        <span>💜</span>
        <span className="font-medium">
          Thanks for your donation!
        </span>
      </div>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 h-0.75 w-full bg-slate-200">
        <div className="h-full bg-linear-to-r from-purple-600 to-green-400 animate-toast-progress" />
      </div>
    </div>
  ),
  { duration: 3000 }
);

setPaymentform({ name: "", message: "", amount: "" });
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (err) {
    console.error("Payment failed:", err);
    toast.error("Payment failed. Try again.", { id: "pay" });
  }
};
  
const emailUsername = user?.email?.split("@")[0];

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="min-h-screen bg-[#0b1220] text-white">

      {/* COVER */}
      <div className="relative w-full h-48 sm:h-64 md:h-87.5">
        <img
          className="w-full h-full object-cover"
          src={user?.coverPic || DEFAULT_COVER}
          alt=""
        />
      </div>

      {/* PROFILE */}
      <div className="flex justify-center -mt-12 sm:-mt-16 md:-mt-20 relative z-10">
        <img
          className="rounded-full w-25 h-25 sm:w-30 sm:h-30 md:w-37.5 md:h-37.5 border-4 border-[#0b1220]"
          src={user?.profilePic || DEFAULT_PROFILE}
          alt="profile"
        />
      </div>

      {/* INFO */}
      <div className="info flex justify-center items-center mt-4 sm:mt-6 mb-4 sm:mb-6 flex-col gap-2 text-center px-4">
        <div className="font-bold text-lg sm:text-xl">
  @{emailUsername || username}
</div>

        <div className="text-slate-400 text-sm sm:text-base">
          Creating Animated art for VTT&apos;s
        </div>

        <p className="text-slate-400 mt-1 text-sm">
  Let&apos;s help {username} get a coffee!
</p>

<p className="text-slate-500 text-xs sm:text-sm mt-2">
  · {totalPayments} Payments · ₹{totalRaised} raised
</p>

      </div>

      {/* PAYMENT SECTION */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

            {/* SUPPORTERS */}

<div className="bg-[#0f172a] rounded-xl p-4 sm:p-6 w-full lg:w-1/2 shadow-lg border border-white/5">
  <h2 className="text-lg sm:text-xl font-semibold mb-4">Supporters</h2>

  {payments.length === 0 && (
    <p className="text-gray-400 text-sm">
      No supporters yet. Be the first one ❤️
    </p>
  )}

  {payments.map((p, i) => (
    <div
      key={i}
      className="grid grid-cols-[40px_1fr_auto] items-start gap-2 sm:gap-3 mb-3 last:mb-0 text-xs sm:text-sm"
    >
      <img
        src="/avatar.gif"
        alt="supporter"
        className="w-10 h-10 rounded-full"
      />

      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">
          Received from{" "}
          {p.name?.trim() || "Anonymous Supporter"}
        </span>

        {p.message && (
          <span className="text-xs text-slate-400 mt-1">
            “{p.message}”
          </span>
        )}
      </div>

      <span className="text-green-400 font-bold whitespace-nowrap">
        ₹{p.amount}
      </span>
    </div>
  ))}
</div>

            {/* MAKE PAYMENT */}
            <div className="makePayment w-full lg:w-1/2 bg-slate-900 rounded-lg text-white p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold my-4 sm:my-5">Make a Payment</h2>

              <div className="flex gap-2 flex-col">
<input
  type="text"
  placeholder="Enter Name"
  value={paymentform.name}
  onChange={(e) =>
    setPaymentform({ ...paymentform, name: e.target.value })
  }
  className="
    w-full
    bg-[#0f172a]
    border border-white/10
    rounded-lg
    px-4 py-3
    text-white
    placeholder:text-slate-400
    outline-none
    transition-all duration-200
    hover:border-white/20
    focus:border-purple-500/60
    focus:ring-2 focus:ring-purple-500/30
    focus:bg-[#111827]
  "
/>

<input
  type="text"
  placeholder="Enter Message"
  value={paymentform.message}
  onChange={(e) =>
    setPaymentform({ ...paymentform, message: e.target.value })
  }
  className="
    w-full
    bg-[#0f172a]
    border border-white/10
    rounded-lg
    px-4 py-3
    text-white
    placeholder:text-slate-400
    outline-none
    transition-all duration-200
    hover:border-white/20
    focus:border-purple-500/60
    focus:ring-2 focus:ring-purple-500/30
    focus:bg-[#111827]
  "
/>

<input
  type="number"
  placeholder="Enter Amount"
  value={paymentform.amount}
  onChange={(e) =>
    setPaymentform({ ...paymentform, amount: e.target.value })
  }
  className="
    w-full
    bg-[#0f172a]
    border border-white/10
    rounded-lg
    px-4 py-3
    text-white
    placeholder:text-slate-400
    outline-none
    transition-all duration-200
    hover:border-white/20
    focus:border-purple-500/60
    focus:ring-2 focus:ring-purple-500/30
    focus:bg-[#111827]
  "
/>


                <button
  type="button"
  onClick={() => pay(Number(paymentform.amount))}
  className="mt-2 text-white bg-linear-to-br from-purple-600 to-blue-500
  hover:bg-linear-to-bl focus:ring-4 focus:outline-none
  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
>
  Pay
</button>


                <div className="flex gap-2 flex-wrap mt-3 sm:mt-4">
  <button
    type="button"
    onClick={() => pay(10)}
    className="flex-1 min-w-17.5 bg-slate-800 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-base"
  >
    Pay $10
  </button>

  <button
    type="button"
    onClick={() => pay(20)}
    className="flex-1 min-w-17.5 bg-slate-800 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-base"
  >
    Pay $20
  </button>

  <button
    type="button"
    onClick={() => pay(30)}
    className="flex-1 min-w-17.5 bg-slate-800 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-base"
  >
    Pay $30
  </button>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
      </div>
    </>
  )
  
}
  

export default Username
