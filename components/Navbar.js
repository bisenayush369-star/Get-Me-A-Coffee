"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
const pathname = usePathname();
const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-950 text-white">
      <div className="w-full px-4 md:px-10 h-16 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
          <img
            src="/coffee.gif"
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <span>GetMeaCoffee!</span>
        </Link>

        {/* CENTER: NAV LINKS
        <ul className="flex items-center gap-7 text-sm">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
        </ul> */}

        {/* RIGHT: ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          {session && (
  <button
  onClick={() => setOpen(!open)}
  onBlur={() => {
    setTimeout(() => {
      setOpen(false)
    }, 300)
  }}
  className="text-white bg-blue-600 hover:bg-blue-700
  focus:ring-4 focus:outline-none focus:ring-blue-300
  font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2">

<span className="flex items-center gap-2">
  Account
<svg
    className={`w-3 h-3 transition-transform ${
      open ? "rotate-180" : ""
    }`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 1 4 4 4-4"
    />
  </svg>
</span>
</button>

)}

{session && open && (
  <div className="absolute right-4 sm:right-16 md:right-32 top-14 z-10 bg-gray-800
  text-white rounded-lg shadow w-44 sm:w-40">
    <ul className="py-2 text-sm">
      <li>
        <Link
          href="/dashboard"
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          href="/settings"
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Your Page 
        </Link>
      </li>
      <li>

      </li>
      <li>
        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 hover:bg-gray-700"
        >
          Sign out
        </button>
      </li>
    </ul>
  </div>
)}
{session ? (
  <Link
    href="/logout"
    className="text-white bg-gradient-to-br from-purple-600 to-blue-500
    hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
    focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2"
  >
    Logout
  </Link>
) : (
  pathname !== "/login" && (
    <Link
      href="/login"
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500
      hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
      focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2"
    >
      Login
    </Link>
  )
)}
        </div>
        
      </div>
    </nav>
  );
}