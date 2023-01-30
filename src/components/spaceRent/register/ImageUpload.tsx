import React, {
  ChangeEvent,
  Dispatch,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { subTitleStyle } from "./style";
import Portal from "../../../Portal";

interface ImageUploadProps {
  setImgPreviewOnOff: Dispatch<React.SetStateAction<boolean>>;
  imgPreviewOnOff: boolean;
}

export default function ImageUpload({
  setImgPreviewOnOff,
  imgPreviewOnOff,
}: ImageUploadProps) {
  const { setValue } = useFormContext();

  const [imgPreviewImgUrl, setImgPreviewImgUrl] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const [base64File, setBase64File] = useState<string[]>([]);

  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1020,
    useWebWorker: true,
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const convertBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
          resolve(
            setBase64File((prev) => [...prev, fileReader.result as string])
          );
        };

        fileReader.readAsDataURL(file);
        fileReader.onerror = reject;
      });
    };
    const compressedFile =
      e.target.files && (await imageCompression(e.target.files[0], options));
    compressedFile && convertBase64(compressedFile);
  };

  useEffect(() => {
    setValue(
      "images",
      base64File.map((item) => item)
    );
  }, [base64File]);
  return (
    <div>
      <p className={subTitleStyle}>이미지</p>
      <div className="flex flex-wrap gap-2 mx-5 ">
        {base64File.length > 0 &&
          base64File.map((item) => (
            <div className="mt-2">
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
                  }}
                />
                <button
                  type="button"
                  className="absolute -top-3 -right-3 bg-delete bg-no-repeat bg-cover bg-center w-8 h-8"
                  onClick={() => {
                    setBase64File(base64File.filter((i) => i !== item));
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
