"use client"

import React, { useEffect, useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form, setForm] = useState(() => ({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  }))

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
    }
  }, [status, session, router])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("SAVE CLICKED", form)

    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      console.log("API RESPONSE:", data)

      if (data.success === true) {
        router.push("/profile")
        return
      }

      alert("Failed to save profile ❌")
    } catch (error) {
      console.error("SAVE ERROR:", error)
      alert("Something went wrong ❌")
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex justify-end">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Welcome to your Dashboard
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              ["name", "Name"],
              ["email", "Email"],
              ["username", "Username"],
              ["profilepic", "Profile Picture"],
              ["coverpic", "Cover Picture"],
              ["razorpayid", "Razorpay Id"],
              ["razorpaysecret", "Razorpay Secret"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm text-white mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-700 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-400 py-4">
        Copyright © 2026 GetMeaCoffee — All rights reserved!
      </footer>
    </div>
  )
}

export default Dashboard
