import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { homeGym } from "../../interface/space";
// import DatePicker, { registerLocale } from "react-datepicker";
// import dayjs from "dayjs";
// import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

export default function SpaceRegister() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<homeGym>();
  const onSubmit = (data: homeGym) => console.log(data);
  const spaceTypeList = ["유산소", "무산소", "필라테스", "GX"];
  const spaceTypeListParam = ["aerobic", "anaerobic", "pilates", "GX"];
  const convenienceList = ["WIFI", "주차", "샤워", "수건"];
  const convenienceListParam = ["WIFI", "PARKING", "SHOWER", "TOWEL"];

  const [startTime, setStartTime] = useState<number>(0);

  const timeOption = Array(24)
    .fill(1)
    .map((v, i) => i + 1);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(Number(e.currentTarget.value));
  };
  //   registerLocale("ko", ko);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* 사진 입력 */}
      <input
        type="file"
        multiple
        accept="image/jpg,image/png,image/jpeg,image/gif"
        {...register("urls")}
      />
      {/* 제목 입력 */}
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="제목"
      />
      {/* 운동 타입 */}
      <div className="flex gap-5">
        {spaceTypeList.map((item, idx) => (
          <label className="flex gap-1" key={item}>
            <input
              value={spaceTypeListParam[idx]}
              type="checkbox"
              {...register("spaceType", { required: true })}
            />
            <p>{item}</p>
          </label>
        ))}
      </div>

      {/* 가격 입력 */}
      <input
        type="number"
        {...register("price", { required: true })}
        placeholder="₩ 가격"
      />
      {/* 시간 입력 */}
      <div>
        <select {...register("openTime")} onChange={onChangeHandler}>
          <option value="none">시작시간</option>
          {timeOption.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <select {...register("closeTime")}>
          <option value="none">마감시간</option>
          {timeOption
            .filter((time) => time > startTime)
            .map((item) => (
              <option value={item}>{item}</option>
            ))}
        </select>
      </div>

      {/* <Controller
        name="open_time"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            dateFormat="yyyy년 MM월 dd일 a hh시"
            dateFormatCalendar="yyyy년 MM월"
            locale="ko"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="시작시간"
            placeholderText="시작일"
            selected={value}
            minDate={new Date()} // 과거 날짜 disable
            popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(data: any) => onChange(data)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dayClassName={(date: any): any => {
              dayjs(date).day() === 6
                ? "saturday"
                : dayjs(date).day() === 0
                ? "sunday"
                : null;
            }}
          />
        )}
      />
      <Controller
        name="close_time"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            dateFormat="yyyy년 MM월 dd일 a hh시"
            dateFormatCalendar="yyyy년 MM월"
            locale="ko"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="마감시간"
            placeholderText="마감일"
            selected={value}
            minDate={new Date()} // 과거 날짜 disable
            popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(data: Date) => onChange(data)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dayClassName={(date: Date): string =>
              dayjs(date).day() === 6
                ? "saturday"
                : dayjs(date).day() === 0
                ? "sunday"
                : ""
            }
          />
        )}
      /> */}

      {/* 주소 */}
      <input
        type="text"
        {...register("address", { required: true })}
        placeholder="주소"
      />
      <input
        type="text"
        {...register("detail_address", { required: true })}
        placeholder="상세주소"
      />
      {/* 내용 */}
      <input
        type="text"
        {...register("content", { required: true })}
        placeholder="내용"
      />
      {/* 편의사항 */}
      <div className="flex gap-5">
        {convenienceList.map((item, idx) => (
          <label className="flex gap-1" key={item}>
            <input
              value={convenienceListParam[idx]}
              type="checkbox"
              {...register("convenienceTypes", { required: true })}
            />
            <p>{item}</p>
          </label>
        ))}
      </div>
      {/* 주의사항 */}
      <input
        type="text"
        {...register("note", { required: true })}
        placeholder="주의사항"
      />
      {/* 규칙 */}
      <input
        type="text"
        {...register("rule", { required: true })}
        placeholder="규칙"
      />
      <input type="submit" />
    </form>
  );
}
