

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full text-white">

      {/* HERO */}
      <div className="flex justify-center w-full px-4">
        <div className="text-center w-full max-w-2xl">

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <img
              src="/coffee.gif"
              alt="Coffee"
              className="w-12 h-12 sm:w-15 sm:h-15 object-contain opacity-80"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
              Get Me a Coffee
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">
            A crowdfunding platform for creators to fund their projects.
          </p>

          <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">
            A place where your fans can buy you a coffee and help bring your ideas to life.
          </p>

          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            <Link href="/login">
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2">
                Start Here
              </button>
            </Link>

            <Link href="/about">
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="bg-white h-1 opacity-10 mt-8 sm:mt-14 mx-4"></div>

   {/* FEATURES + LEARN WRAPPER */}
<div className="w-full mt-16 sm:mt-24">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">

    {/* FEATURES */}
    <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-200 mb-10 sm:mb-14">
  Your Fans can buy you a Coffee
</h2>


    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 text-center">
      {/* Feature 1 */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
          <img src="/worker.gif" alt="Fans want to help" className="w-8 sm:w-10" />
        </div>
        <h3 className="font-semibold text-sm sm:text-base">Fans want to help</h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-[220px]">
          Your fans are available for you to help you
        </p>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
          <img src="/dollar.gif" alt="Get paid easily" className="w-8 sm:w-10" />
        </div>
        <h3 className="font-semibold text-sm sm:text-base">Get paid easily</h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-[220px]">
          Receive support directly from your fans
        </p>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
          <img src="/member.gif" alt="Build community" className="w-8 sm:w-10" />
        </div>
        <h3 className="font-semibold text-sm sm:text-base">Build community</h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-[220px]">
          Grow your audience and supporters
        </p>
      </div>
    </div>

{/* LEARN MORE ABOUT ME SECTION */}
<div className="w-full mt-16 sm:mt-24">

    {/* FULL WIDTH DIVIDER */}
    <div className="w-full h-1 bg-white/10 my-10 sm:my-14">
    </div>

    {/* LEARN MORE ABOUT ME */}
    <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-200 mb-10 sm:mb-14">
  Learn more about me
</h2>

    <div className="flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full px-4">

    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/in/ayush-bisen-53a970398/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition"
    >
      <img src="/linkedin.png" alt="LinkedIn" className="w-4 sm:w-5 h-4 sm:h-5" />
      <span>LinkedIn</span>
    </a>

    {/* X / Twitter */}
    <a
      href="https://x.com/AyushdevX"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 border border-white/10 rounded-lg hover:bg-white/5 transition text-xs sm:text-sm"
    >
      <img src="/twitter.png" alt="Twitter" className="w-4 sm:w-5 h-4 sm:h-5" />
      <span>X (Twitter)</span>
    </a>

    {/* GitHub */}
    <a
      href="https://github.com/bisenayush369-star/Get-Me-A-Coffee"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 border border-white/10 rounded-lg hover:bg-white/5 transition text-xs sm:text-sm"
    >
      <img src="/github.svg" alt="GitHub" className="w-4 sm:w-5 h-4 sm:h-5" />
      <span>GitHub</span>
    </a>

  </div>
</div>

{/* EXTRA SCROLL SPACE AFTER LEARN MORE */}
<div className="h-10 sm:h-20"></div>

  </div>
</div>

        </div>
      </div>

    // </div>
  );
}
