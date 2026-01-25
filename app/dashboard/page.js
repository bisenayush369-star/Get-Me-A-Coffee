"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  // ✅ DEFINE FIRST
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilePic: "",
    coverPic: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ THEN USE
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // ✅ autofill email from session
  // useEffect(() => {
  //   if (session?.user?.email) {
  //     setForm((prev) => ({
  //       ...prev,
  //       email: session.user.email,
  //     }));
  //   }
  // }, [session]);

  // ✅ REQUIRED: this was missing before
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SAVE + REDIRECT
  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert("Save failed");
        return;
      }

      // ✅ THIS IS THE REDIRECT (WORKING)
      router.push(`/${form.username}`);

    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Welcome to your Dashboard
        </h1>

        {[
          ["Name", "name"],
          ["Email", "email"],
          ["Username", "username"],
          ["Profile Picture", "profilePic"],
          ["Cover Picture", "coverPic"],
          ["Razorpay Id", "razorpayId"],
          ["Razorpay Secret", "razorpaySecret"],
        ].map(([label, name]) => (
          <div key={name} className="mb-3 sm:mb-4">
            <label className="block mb-1 text-sm">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 sm:py-3 rounded mt-4 sm:mt-6 font-medium text-sm"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
