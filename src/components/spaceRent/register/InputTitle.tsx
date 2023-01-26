import React from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { homeGymInfo } from "../../../interface/space";
import { inputStyle, maxWidth, subTitleStyle } from "./style";

interface InputTitleProps {
  control: Control<homeGymInfo>;
}

export default function InputTitle() {
  const { register } = useFormContext();
  return (
    <div>
      <p className={subTitleStyle}>제목</p>
      <div className={maxWidth}>
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="제목을 입력해주세요."
          className={inputStyle}
        />
      </div>
    </div>
  );
}
