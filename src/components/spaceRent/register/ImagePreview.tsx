import React, { Dispatch, SetStateAction, useEffect } from "react";

interface ImagePreviewProps {
  url: string;
  setImgPreviewOnOff: Dispatch<SetStateAction<boolean>>;
}

export default function ImagePreview({
  url,
  setImgPreviewOnOff,
}: ImagePreviewProps) {
  const bodyTag = document.body;

  return (
    <div>
      <div
        style={{ backgroundImage: `url("${url}")` }}
        className="absolute z-[9999] bottom-[254px] left-1/2 transform -translate-x-1/2 - bg-no-repeat bg-cover bg-center w-full h-0 pb-[100%] bg-white "
      />
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-screen h-screen z-10 bg-black opacity-30"
        onClick={() => {
          setImgPreviewOnOff(false);
          bodyTag.style.removeProperty("overflow");
        }}
      ></div>
    </div>
  );
}
