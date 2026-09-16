import React from 'react';

export function VidGalleryDetail({ selectedProject, language, t, setLightboxState }: any) {
  const isBorderedArray = ["comm-1", "comm-2", "comm-3", "comm-4", "illus-1", "oth-1", "brand-3", "brand-4", "vid-3", "vid-6", "vid-7", "vid-8", "vid-9"];
  const isGrid = selectedProject.id === "vid-1";
  
  return (
    <div className={
      isBorderedArray.includes(selectedProject.id) 
        ? "flex flex-col gap-6 w-full" 
        : isGrid
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
          : "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    }>
      {selectedProject.gallery.map((imgUrl: string, gIdx: number, arr: string[]) => (
        <div key={gIdx} className={`group relative overflow-hidden bg-zinc-900 shadow-xl cursor-pointer w-full ${isBorderedArray.includes(selectedProject.id) ? "rounded-sm border border-white/5" : "aspect-video rounded-sm border border-white/5"}`} onClick={() => setLightboxState({images: arr, index: gIdx})}>
          <img
            src={imgUrl}
            alt="Visual fragment"
            className={`w-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100 ${isBorderedArray.includes(selectedProject.id) ? "h-auto" : "h-full"}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 text-[10px] text-zinc-400 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans tracking-wider uppercase backdrop-blur-sm">
            {t("点击查看大图", "Click to Zoom")}
          </div>
        </div>
      ))}
    </div>
  );
}
