import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import Select from "react-select";
import { spaceContentDetailLabelState } from "../../../common";

import { couponType, homeGymInfo } from "../../../interface/space";

interface SpaceReservationForm {
  date: Date;
  reservationTime: number;
  coupon: couponType;
}

interface ReservationTimeSelectProps {
  control: Control<SpaceReservationForm>;
}

export default function ReservationTimeSelect({
  control,
}: ReservationTimeSelectProps) {
  const [startAMPM, setStartAMPM] = useState<string>("오전");
  const spaceContentDetailLabel = useRecoilValue<homeGymInfo>(
    spaceContentDetailLabelState
  );

  registerLocale("ko", ko);

  const inputStyle =
    "mt-2 w-full max-w-[100% - 40px] h-11 border rounded-lg p-[10px]";

  const AMPMOption = ["오전", "오후"];

  const timeOption = Array(24)
    .fill({ value: 1, label: `${1} 시` })
    .map((v, i) => ({ value: i + 1, label: `${i + 1}시` }));

  const onChangeStartHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartAMPM(e.currentTarget.value);
  };
  return (
    <article className="max-w-[435px] min-w-[280px] mx-5">
      <h4 className="mt-6 text-content-box-text-gray">예약일</h4>
      <Controller
        control={control}
        name="date"
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
      <h4 className="mt-6 text-content-box-text-gray">예약 시간</h4>
      <div className="flex gap-2 mt-2">
        <select
          onChange={onChangeStartHandler}
          className="w-[20%] border rounded-[8px] h-[44px]"
        >
          {AMPMOption.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="w-full h-11">
          <Controller
            name="reservationTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                options={timeOption.filter((item) => {
                  return startAMPM === "오전"
                    ? item.value < 13 &&
                        item.value >= spaceContentDetailLabel.openTime
                    : item.value > 12 &&
                        item.value < spaceContentDetailLabel.closeTime;
                })}
                value={timeOption.find(
                  (c: { value: unknown }) => c.value === value
                )}
                onChange={(val) => onChange(val)}
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
                placeholder="예약시간을 선택해주세요."
              />
            )}
            rules={{ required: true }}
          />
        </div>
      </div>
    </article>
  );
}
