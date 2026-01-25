"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DEFAULT_PROFILE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10";

const DEFAULT_COVER =
  "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/19.gif";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "loading") return;

    // Not logged in → login
    if (!session?.user?.username) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `/api/profile?username=${session.user.username}`
        );

        if (!res.ok) {
          console.error("Profile API failed:", res.status);
          return;
        }

        const data = await res.json();
        console.log("PROFILE DATA:", data);
        setUser(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [session, status, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* COVER */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src={
            user.coverPic && user.coverPic.length > 5
              ? user.coverPic
              : DEFAULT_COVER
          }
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* PROFILE IMAGE */}
      <div className="relative -mt-16 sm:-mt-20 md:-mt-24 flex justify-center px-4">
        <img
          src={
            user.profilePic && user.profilePic.length > 5
              ? user.profilePic
              : DEFAULT_PROFILE
          }
          alt="profile"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#020617] object-cover"
        />
      </div>

      {/* INFO */}
      <div className="text-center mt-2 sm:mt-4 px-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          @{user.username || "profile"}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Creating Animated art for VTTs
        </p>
      </div>
    </div>
  );
}
