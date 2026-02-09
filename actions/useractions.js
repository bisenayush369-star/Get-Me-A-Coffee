"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "../app/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb()

  console.log("RAW to_username:", to_username)
  console.log("TYPE of to_username:", typeof to_username)

  // ✅ FIND USER
  let user = await User.findOne({ username: to_username })

if (!user) {
  console.log("User not found, creating new user:", to_username)

  user = await User.create({
    username: to_username,
    email: `${to_username}@creator.local`,
  })
}

// ✅ FORCE-SET KEYS (THIS IS THE MISSING PART)
if (!user.razorpayid || !user.razorpaysecret) {
  console.log("Injecting Razorpay keys into user:", to_username)

  user.razorpayid = process.env.RAZORPAY_KEY_ID
  user.razorpaysecret = process.env.RAZORPAY_KEY_SECRET

  await user.save()
}

  // ✅ CHECK RAZORPAY KEYS
  if (!user.razorpayid || !user.razorpaysecret) {
    throw new Error("Razorpay keys not set for this user")
  }

  // ✅ CREATE RAZORPAY INSTANCE
  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: user.razorpaysecret,
  })

  const options = {
    amount: Number(amount) * 100,
    currency: "INR",
  }

  const order = await instance.orders.create(options)

  // ✅ SAVE PAYMENT
//   await Payment.create({
//   oid: order.id,
//   amount: amount,
//   to_user: to_username,
//   name: paymentform.name || "Anonymous",
//   message: paymentform.message || "",
//   done: true,
// })

  return order
}

export const fetchuser = async (username) => {
  await connectDb()

  const userDoc = await User.findOne({ username })
  console.log("USER FOUND:", userDoc)

  if (!userDoc) {
    throw new Error("User not found in database")
  }

  const user = userDoc.toObject({ flattenObjectIds: true })
  return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).limit(10).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        
    }
    else{

        
        await User.updateOne({email: ndata.email}, ndata)
    }


}

