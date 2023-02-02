import React, {
  ChangeEvent,
  Dispatch,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { image } from "../../../interface/space";
import Portal from "../../../Portal";
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
  const [images, setImages] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const bodyTag = document.body;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if ((e.target.files as FileList).length) {
      setImages((prev) => [
        ...prev,
        URL.createObjectURL((e.target.files as FileList)[0]),
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
            <div className="mt-2" key={item}>
              <div className="relative">
                <img
                  src={item}
                  alt="dummy"
                  width="80"
                  height="80"
                  className="relative w-20 h-20  rounded-xl"
                  onClick={() => {
                    setImgPreviewImgUrl(item);
                    setImgPreviewOnOff(!imgPreviewOnOff);
                    bodyTag.style.overflow = "hidden";
                  }}
                />
                <button
                  type="button"
                  className="absolute -top-3 -right-3 bg-delete bg-no-repeat bg-cover bg-center w-8 h-8"
                  onClick={() => {
                    setImages(images.filter((i) => i !== item));
                  }}
                ></button>
              </div>
              {imgPreviewOnOff && (
                <Portal setState={setImgPreviewOnOff} state={imgPreviewOnOff}>
                  <div
                    style={{ backgroundImage: `url("${imgPreviewImgUrl}")` }}
                    className="absolute z-[9999] h-0 pb-[30%] max-w-[70%] bg-no-repeat bg-contain bg-center w-full h-0 pb-[100%] bg-white "
                  />
                </Portal>
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
