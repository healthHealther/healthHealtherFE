import React, { Dispatch, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { image } from "../../../interface/space";
import ImagePreview from "./ImagePreview";
import { subTitleStyle } from "./style";

interface ImageUploadProps {
  setImgPreviewOnOff: Dispatch<React.SetStateAction<boolean>>;
  imgPreviewOnOff: boolean;
}

export default function ImageUpload({
  setImgPreviewOnOff,
  imgPreviewOnOff,
}: ImageUploadProps) {
  const { register, setValue, getValues } = useFormContext();

  const [imgPreviewImgUrl, setImgPreviewImgUrl] = useState<string>("");
  const [images, setImages] = useState<image[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const bodyTag = document.body;

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImages((prev) => [
        ...prev,
        {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        },
      ]);
    }
  };

  useEffect(() => {
    setValue(
      "images",
      images.map((item) => item)
    );
  }, [images]);
  return (
    <div>
      <p className={subTitleStyle}>이미지</p>
      <div className="flex flex-wrap gap-2 mx-5 ">
        {images.length > 0 &&
          images.map((item) => (
            <div className="mt-2">
              <div className="relative">
                <img
                  src={item.preview}
                  alt="dummy"
                  width="80"
                  height="80"
                  className="relative w-20 h-20  rounded-xl"
                  onClick={() => {
                    setImgPreviewImgUrl(item.preview);
                    setImgPreviewOnOff(!imgPreviewOnOff);
                    bodyTag.style.overflow = "hidden";
                  }}
                />
                <button
                  type="button"
                  className="absolute -top-3 -right-3 bg-delete bg-no-repeat bg-cover bg-center w-8 h-8"
                  onClick={() => {
                    setImages(images.filter((i) => i.raw !== item.raw));
                  }}
                ></button>
              </div>
              {imgPreviewOnOff && (
                <ImagePreview
                  url={imgPreviewImgUrl}
                  setImgPreviewOnOff={setImgPreviewOnOff}
                />
              )}
            </div>
          ))}
        <input
          type="button"
          onClick={() => {
            fileInput.current && fileInput.current.click();
          }}
          className="w-20 h-20 mt-2 mb-8 bg-upload bg-no-repeat bg-cover bg-center"
        />
        <input
          type="file"
          multiple
          accept="image/jpg,image/png,image/jpeg,image/gif"
          onChange={handleChange}
          ref={fileInput}
          hidden={true}
        />
      </div>
    </div>
  );
}
