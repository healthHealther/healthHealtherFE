import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import { homeGymInfo } from "../../../interface/space";
import { inputStyle, maxWidth, subTitleStyle } from "./style";
import Portal from "../../../Portal";

export default function InputAddress() {
  const { register, setValue, getValues } = useFormContext<homeGymInfo>();
  const [addressOnOff, setAddressOnOff] = useState<boolean>(false);

  useEffect(() => {
    addressOnOff === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [addressOnOff]);

  const onCompletePost = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: React.SetStateAction<string>;
  }) => {
    setValue("address", data.address);
    setAddressOnOff(!addressOnOff);
  };
  return (
    <div>
      <p className={subTitleStyle}>제목</p>

      <div className="mt-2 mx-5 flex gap-2">
        <input
          type="text"
          placeholder="주소를 입력해주세요"
          className="w-[80%] h-11 border rounded-lg p-[10px] bg-black/[.03]"
          {...register("address", { required: true })}
          readOnly
          onClick={() => setAddressOnOff(!addressOnOff)}
          value={getValues("address") && getValues("address")}
        />
        <button
          type="button"
          className="w-[20%] rounded-lg h-11 bg-homeGymPrice-green text-white"
          onClick={() => setAddressOnOff(!addressOnOff)}
        >
          주소찾기
        </button>
      </div>
      {addressOnOff && (
        <Portal setState={setAddressOnOff} state={addressOnOff}>
          <DaumPostcode
            autoClose
            onComplete={onCompletePost}
            style={{ width: "100%", height: "500px" }}
            className="absolute max-w-[435px] z-[9999] h-[440px] top-[42.8%] left-1/2 transform -translate-x-1/2 -translate-y-[49%] bg-white border "
          />
        </Portal>
      )}

      <div className={maxWidth}>
        <input
          type="text"
          {...register("addressDetail", { required: true })}
          placeholder="상세 주소를 입력해주세요"
          className={inputStyle}
        />
      </div>
    </div>
  );
}
