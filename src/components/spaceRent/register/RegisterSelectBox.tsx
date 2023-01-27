import React from "react";
import {
  Control,
  Controller,
  useFormContext,
  UseFormSetValue,
} from "react-hook-form";
import Select from "react-select";
import { homeGymInfo } from "../../../interface/space";
import { maxWidth, subTitleStyle } from "./style";

interface RegisterSelectBoxProps {
  option: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  spaceType: string;
  spaceTypeTitle: string;
}

export default function RegisterSelectBox({
  option,
  placeholder,
  spaceType,
  spaceTypeTitle,
}: RegisterSelectBoxProps) {
  const { register, setValue, getValues } = useFormContext();

  // 편의 시설 객체
  const objectConvenienceType = [
    { value: "SHOWER", label: "샤워" },
    { value: "PARKING", label: "주차시설" },
    { value: "CHANGINGROOM", label: "탈의실" },
    { value: "FULLBODYMIROR", label: "전신거울" },
    { value: "WIFI", label: "와이파이" },
    { value: "FOOD", label: "음식물반입여부" },
    { value: "SCALE", label: "체중계" },
    { value: "TOWEL", label: "수건" },
  ];

  return (
    <div>
      <p className={subTitleStyle}>{spaceTypeTitle}</p>
      <div className={maxWidth}>
        <Select
          className="h-11"
          options={option} // set list of the data
          onChange={(e) => {
            setValue(spaceType, Array.isArray(e) ? e.map((x) => x.value) : []);
          }} // assign onChange function
          isMulti
          isClearable
          placeholder={placeholder}
          {...(register(spaceType), { required: true })}
          styles={{
            control: (base) => ({
              ...base,
              border: `1px soild`,
              height: "44px",
            }),
            option: (base) => ({
              ...base,
              border: `1px dotted`,
              height: "100%",
            }),
          }}
        />
      </div>
    </div>
  );
}
