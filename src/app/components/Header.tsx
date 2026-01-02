"use client";
import useSWR from "swr";

export const Header = () => {
  return (
    <header className="w-full h-[59px] bg-white px-12 flex items-center justify-between ">
      {/* Logo */}
      <div className="h-[20px] w-[92px]">
        <img
          src="/Logo.png"
          alt="Movie Z Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Center */}
      <div className="flex items-center gap-3">
        {/* Genre button */}
        <button className="flex items-center justify-center gap-2 h-[36px] w-[97px] rounded-md border border-[#E4E4E7] text-sm">
          <img src="/down.png" alt="Dropdown icon" className="h-3 w-3" />
          Genre
        </button>

        {/* Search */}
        <div className="relative">
          <img
            src="/search.svg"
            alt="Search icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-[36px] w-[388px] pl-10 rounded-md border border-[#E4E4E7] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Right icon */}
      <button className="h-[36px] w-[36px] flex items-center justify-center rounded-md border border-[#E4E4E7] hover:bg-gray-100">
        <img src="/moon.png" alt="Dark mode" className="h-4 w-4" />
      </button>
    </header>
  );
};
