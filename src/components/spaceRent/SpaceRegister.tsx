import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { homeGymInfo } from "../../interface/space";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";

// import DatePicker, { registerLocale } from "react-datepicker";
// import dayjs from "dayjs";
// import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

interface image {
  preview: string;
  raw: string;
}

const subTitleStyle = "mt-6 mx-5 text-register-subTitle-gray font-bold";
const textAreaStyle =
  "mt-2 mx-5  h-[116px] border rounded-lg p-[10px] resize-none";
const inputStyle =
  "mt-2 mx-5 max-w-[100% - 40px] h-11 border rounded-lg p-[10px]";

export default function SpaceRegister() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<homeGymInfo>();
  const onSubmit = (data: homeGymInfo) => {
    console.log(data);
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const [startAMPM, setStartAMPM] = useState<string>("오전");
  const [closeAMPM, setCloseAMPM] = useState<string>("오전");

  const AMPMOption = ["오전", "오후"];

  const onChangeStartHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartAMPM(e.currentTarget.value);
  };

  const onChangeCloseHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCloseAMPM(e.currentTarget.value);
  };

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

  const objectSpaceType = [
    { value: "AEROBIC", label: "유산소" },
    { value: "ANAEROBIC", label: "무산소" },
    { value: "PILATES", label: "필라테스" },
    { value: "GX", label: "GX" },
  ];

  const [image, setImage] = useState<image[]>([]);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage((prev) => [
        ...prev,
        {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        },
      ]);
    }
  };

  //   registerLocale("ko", ko);
  return (
    <section className="w-full min-w-[280px] mx-auto mt-[26px] mb-20">
      <h1 className="text-xl mx-5 font-bold pt-8">홈짐 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
        {/* 제목 입력 */}
        <p className={subTitleStyle}>제목</p>
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="제목을 입력해주세요."
          className={inputStyle}
        />

        {/* 내용 */}
        <p className={subTitleStyle}>내용</p>
        <textarea
          className={textAreaStyle}
          {...register("content", { required: true })}
          placeholder="내용을 입력하세요"
        />

        {/* 주소 */}
        <p className={subTitleStyle}>주소</p>
        <div className="mt-2 mx-5 flex gap-2">
          <input
            type="text"
            {...register("address", { required: true })}
            placeholder="주소를 입력해주세요"
            className="w-[80%] h-11 border rounded-lg p-[10px] bg-black/[.03]"
          />
          <button className="w-[20%] rounded-lg h-11 bg-homeGymPrice-green text-white">
            주소찾기
          </button>
        </div>
        <input
          type="text"
          {...register("detailAddress", { required: true })}
          placeholder="상세 주소를 입력해주세요"
          className={inputStyle}
        />

        {/* 편의사항 */}
        <p className={subTitleStyle}>편의사항</p>
        <div className="mx-5 h-11 mt-2  ">
          {/* <Multiselect
            {...register("convenienceTypes")}
            className="w-full"
            options={objectArray}
            onSelect={(event) => setValue("convenienceTypes", event)}
            placeholder="편의사항을 선택해주세요"
          /> */}
          <Select
            className="h-11"
            options={objectConvenienceType} // set list of the data
            onChange={(e) => {
              setValue(
                "convenienceTypes",
                Array.isArray(e) ? e.map((x) => x.value) : []
              );
            }} // assign onChange function
            isMulti
            isClearable
            placeholder="편의사항을 선택해주세요"
          />
        </div>

        {/* 공지사항 */}
        <p className={subTitleStyle}>공지사항</p>
        <textarea
          className={textAreaStyle}
          {...register("notice", { required: true })}
          placeholder="내용을 입력해주세요"
        />

        {/* 이용규칙 */}
        <p className={subTitleStyle}>이용규칙</p>
        <textarea
          className={textAreaStyle}
          {...register("rule", { required: true })}
          placeholder="내용을 입력해주세요"
        />

        {/* 가격  */}
        <p className={subTitleStyle}>가격</p>
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="가격을 입력해주세요"
          className={inputStyle}
        />

        {/* 시간 입력 */}
        <p className={subTitleStyle}>오픈 시간</p>
        <div className="flex gap-2 mx-5 mt-2">
          <select
            onChange={onChangeStartHandler}
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
            {...register("openTime", { required: true })}
            placeholder={
              startAMPM === "오전"
                ? "시간을 입력하세요    ex) 0~12"
                : "시간을 입력하세요    ex) 12~24"
            }
            className="w-[80%] h-11 border rounded-lg p-[10px] "
            min={startAMPM === "오전" ? 0 : 12}
            max={startAMPM === "오전" ? 12 : 24}
          />
        </div>
        <p className={subTitleStyle}>마감 시간</p>
        <div className="flex gap-2 mx-5 mt-2">
          <select
            onChange={onChangeCloseHandler}
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
            {...register("closeTime", { required: true })}
            placeholder={
              closeAMPM === "오전"
                ? "시간을 입력하세요    ex) 0~12"
                : "시간을 입력하세요    ex) 12~24"
            }
            className="w-[80%] h-11 border rounded-lg p-[10px] "
            min={closeAMPM === "오전" ? getValues("openTime") : 12}
            max={closeAMPM === "오전" ? getValues("openTime") : 24}
          />
        </div>

        {/* 공간 타입 */}
        <p className={subTitleStyle}>편의사항</p>
        <div className="mx-5 h-11 mt-2  ">
          <Select
            className=""
            options={objectSpaceType} // set list of the data
            onChange={(e) => {
              setValue(
                "spaceTypes",
                Array.isArray(e) ? e.map((x) => x.value) : []
              );
            }} // assign onChange function
            isMulti
            isClearable
            placeholder="공간타입을 선택해주세요"
          />
        </div>

        {/* 사진 입력 */}
        <p className={subTitleStyle}>이미지</p>
        <div className="flex gap-2 mx-5">
          {image.length > 0 &&
            image.map((item) => (
              <img
                src={item.preview}
                alt="dummy"
                width="80"
                height="80"
                className="w-20 h-20 mt-2 rounded-xl"
              />
            ))}
          <button
            onClick={() => {
              fileInput.current && fileInput.current.click();
            }}
            className="w-20 h-20 mx-5 mt-2 mb-8 bg-upload bg-no-repeat bg-cover bg-center"
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

        <button type="submit">제출</button>
      </form>
    </section>
  );
}
