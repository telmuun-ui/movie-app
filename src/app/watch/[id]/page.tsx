"use client"; 

import * as React from "react";

export default function WatchMovie({ params }: { params: Promise<{ id: string }> }) {
 
  const resolvedParams = React.use(params);
  const videoUrl = `https://www.vidking.net/embed/movie/${resolvedParams.id}`;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
   
        <button 
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Details
        </button>

  
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[0_0_50px_rgba(67,56,202,0.2)] bg-neutral-900 border border-white/10">
          <iframe
            src={videoUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            scrolling="no"
  
            sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            allow="autoplay; encrypted-media; picture-in-picture"
          ></iframe>
        </div>

     
        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-bold">You are watching now</h1>
          </div>
          
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-white/5">
            <h3 className="text-indigo-400 font-semibold mb-2">Player Instructions:</h3>
            <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
              <li>Хэрэв видео ажиллахгүй бол хуудсаа дахин ачаална уу (Refresh).</li>
              <li>Интернэт хурднаасаа хамаарч эхний ачаалалт 5-10 секунд авч магадгүй.</li>
              <li>Киногоо тухлан үзээрэй хөөрхнөө.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}