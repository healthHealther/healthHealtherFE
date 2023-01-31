import React from "react";
import { Control, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import dayjs from "dayjs";
import { homeGymInfo, submitHomeGymInfo } from "../../../interface/space";
import { inputStyle } from "./style";

interface OpenExpiredDateProps {
  control: Control<submitHomeGymInfo>;
}

export default function OpenExpiredDate({ control }: OpenExpiredDateProps) {
  registerLocale("ko", ko);
  return (
    <div className="w-full max-w-[435px] min-w-[280px] mx-5">
      <p className="mt-6 text-content-box-text-gray">오픈 날짜</p>
      <div className="flex flex-col">
        <Controller
          control={control}
          name="openDate"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <DatePicker
              {...fieldProps}
              dateFormat="yyyy년 MM월 dd일"
              dateFormatCalendar="yyyy년 MM월"
              locale="ko"
              placeholderText="예약일을 선택해주세요."
              selected={value}
              minDate={new Date()} // 과거 날짜 disable
              popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
              onChange={(data: Date) => onChange(data)}
              dayClassName={(date: Date): string | null =>
                dayjs(date).day() === 6
                  ? "saturday"
                  : dayjs(date).day() === 0
                  ? "sunday"
                  : null
              }
              className={inputStyle}
            />
          )}
        />
      </div>
      <p className="mt-6 text-content-box-text-gray">쿠폰 만료 날짜</p>
      <div className="flex flex-col">
        <Controller
          control={control}
          name="expiredDate"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <DatePicker
              {...fieldProps}
              dateFormat="yyyy년 MM월 dd일"
              dateFormatCalendar="yyyy년 MM월"
              locale="ko"
              placeholderText="예약일을 선택해주세요."
              selected={value}
              minDate={new Date()} // 과거 날짜 disable
              popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
              onChange={(data: Date) => onChange(data)}
              dayClassName={(date: Date): string | null =>
                dayjs(date).day() === 6
                  ? "saturday"
                  : dayjs(date).day() === 0
                  ? "sunday"
                  : null
              }
              className={inputStyle}
            />
          )}
        />
      </div>
    </div>
  );
}
