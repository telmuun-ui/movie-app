import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#4338CA] text-white px-6 md:px-12 py-10 md:py-12">
   
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-0">
        
        {/* Logo & Copyright */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold text-lg">
             <img src="/lg.png" alt="Movie Z Logo" className="h-5 w-auto" />
          </div>
          <p className="text-sm opacity-80">© 2024 Movie Z. All Rights Reserved.</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-normal text-sm">Contact Information</h3>

          <div className="flex items-start gap-3 text-sm opacity-90">
            <div className="p-2 border rounded-full shrink-0">
               <img src="/mail.svg" alt="" className="h-4 w-4 invert brightness-0" />
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p>support@moviez.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm opacity-90">
            <div className="p-2 border rounded-full shrink-0">
               <img src="/phone.svg" alt="" className="h-4 w-4 invert brightness-0" />
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-4">
          <h3 className="font-normal text-sm">Follow us</h3>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 text-sm opacity-90">
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">Youtube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};