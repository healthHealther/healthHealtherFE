import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { subTitleStyle } from "./style";

export default function SelectTime() {
  const [startAMPM, setStartAMPM] = useState<string>("오전");
  const [closeAMPM, setCloseAMPM] = useState<string>("오전");
  const AMPMOption = ["오전", "오후"];

  const { register, getValues, setValue } = useFormContext();

  return (
    <div>
      <p className={subTitleStyle}>오픈 시간</p>
      <div className="flex gap-2 mx-5 mt-2">
        <select
          onChange={(e) => setStartAMPM(e.currentTarget.value)}
          className="w-[20%] border rounded-[8px]"
        >
          {AMPMOption.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="number"
          {...register("openTime", { required: true, valueAsNumber: true })}
          placeholder={
            startAMPM === "오전"
              ? "시간을 입력하세요    ex) 0~11"
              : "시간을 입력하세요    ex) 13~23"
          }
          className="w-[80%] h-11 border rounded-lg p-[10px] "
          min={startAMPM === "오전" ? 0 : 12}
          max={startAMPM === "오후" ? 23 : 12}
          defaultValue={getValues("openTime")}
        />
      </div>
      <p className={subTitleStyle}>마감 시간</p>
      <div className="flex gap-2 mx-5 mt-2">
        <select
          onChange={(e) => setCloseAMPM(e.currentTarget.value)}
          className="w-[20%] border rounded-[8px]"
        >
          {AMPMOption.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="number"
          {...register("closeTime", { required: true, valueAsNumber: true })}
          placeholder={
            closeAMPM === "오전"
              ? "시간을 입력하세요    ex) 0~11"
              : "시간을 입력하세요    ex) 12~23"
          }
          className="w-[80%] h-11 border rounded-lg p-[10px] "
          min={closeAMPM === "오전" ? Number(getValues("openTime")) + 1 : 11}
          max={closeAMPM === "오후" ? 23 : 12}
          defaultValue={getValues("closeTime")}
        />
      </div>
    </div>
  );
}
