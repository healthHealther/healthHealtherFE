import React from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { homeGymInfo } from "../../../interface/space";
import { maxWidth, subTitleStyle, textAreaStyle } from "./style";

interface TextAreaContentProps {
  spaceType: string;
  spaceTypeTitle: string;
}

export default function TextAreaContent({
  spaceType,
  spaceTypeTitle,
}: TextAreaContentProps) {
  const { register } = useFormContext();
  return (
    <div>
      <p className={subTitleStyle}>{spaceTypeTitle}</p>
      <div className={maxWidth}>
        <textarea
          {...register(spaceType, { required: true })}
          className={textAreaStyle}
          placeholder="내용을 입력하세요"
        />
      </div>
    </div>
  );
}
