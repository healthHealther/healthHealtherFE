import React from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { inputStyle, maxWidth, subTitleStyle } from "./style";
import { NumericFormat } from "react-number-format";
import { homeGymInfo } from "../../../interface/space";

interface InputPriceProps {
  control: Control<homeGymInfo>;
}

export default function InputPrice({ control }: InputPriceProps) {
  const { register } = useFormContext();

  return (
    <div>
      <p className={subTitleStyle}>가격</p>
      <div className={maxWidth}>
        <Controller
          render={({ field }) => (
            <NumericFormat
              {...field}
              thousandSeparator
              placeholder="가격을 입력해주세요"
              className={inputStyle}
            />
          )}
          name="price"
          control={control}
        />
      </div>
    </div>
  );
}
