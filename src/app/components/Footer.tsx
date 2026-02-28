import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#4338CA] text-white px-12 py-12">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <img src="./lg.png" alt="" />
          </div>
          <p className="text-sm">© 2024 Movie Z. All Rights Reserved.</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-normal text-sm">Contact Information</h3>

          <div className="flex items-start gap-2 text-sm opacity-90">
            <img
              src="/mail.svg"
              alt=""
              className="h-4 w-4 invert brightness-0"
            />
            <div>
              <p>Email:</p>
              <p>support@moviez.com</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm opacity-90">
            <img
              src="/phone.svg"
              alt=""
              className="h-4 w-4 invert brightness-0"
            />
            <div>
              <p>Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-normal text-sm">Follow us</h3>
          <div className="flex gap-4 text-sm opacity-90">
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
            <a href="#" className="hover:underline">
              Youtube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
