import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { homeGymInfo } from "../../interface/space";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

// import DatePicker, { registerLocale } from "react-datepicker";
// import dayjs from "dayjs";
// import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import ImagePreview from "./register/ImagePreview";

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
    watch,
    formState: { errors },
  } = useForm<homeGymInfo>();

  const watchAllFields = watch([
    "title",
    "content",
    "address",
    "detailAddress",
    "spaceTypes",
    "convenienceTypes",
    "notice",
    "rule",
    "price",
    "images",
    "closeTime",
    "openTime",
  ]);

  const bodyTag = document.body;

  const [finish, setFinish] = useState<boolean>(false);
  const [images, setImages] = useState<image[]>([]);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [startAMPM, setStartAMPM] = useState<string>("오전");
  const [closeAMPM, setCloseAMPM] = useState<string>("오전");
  const [imgPreviewOnOff, setImgPreviewOnOff] = useState<boolean>(false);
  const [imgPreviewImgUrl, setImgPreviewImgUrl] = useState<string>("");

  useEffect(() => {
    watchAllFields.filter(
      (item) => item === "" || item === undefined || item === Array(0)
    ).length === 0
      ? setFinish(true)
      : setFinish(false);
  }, [watchAllFields]);

  const onSubmit = async (data: homeGymInfo) => {
    try {
      await axios.post<homeGymInfo>(`http://localhost:3001/spaces`, {
        title: data.title,
        content: data.content,
        address: data.address,
        detailAddress: data.detailAddress,
        spaceTypes: data.spaceTypes,
        convenienceTypes: data.convenienceTypes,
        notice: data.notice,
        rule: data.rule,
        price: data.price,
        images: data.images,
        closeTime: data.closeTime,
        openTime: data.openTime,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 파일 업로드
  const fileInput = useRef<HTMLInputElement>(null);

  // 시간

  const AMPMOption = ["오전", "오후"];

  const onChangeStartHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartAMPM(e.currentTarget.value);
  };

  const onChangeCloseHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCloseAMPM(e.currentTarget.value);
  };

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

  // 운동 타입 객체
  const objectSpaceType = [
    { value: "AEROBIC", label: "유산소" },
    { value: "ANAEROBIC", label: "무산소" },
    { value: "PILATES", label: "필라테스" },
    { value: "GX", label: "GX" },
  ];

  // 이미지 업로드 함수
  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImages((prev) => [
        ...prev,
        {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        },
      ]);
    }
  };

  useEffect(() => {
    setValue(
      "images",
      images.map((item) => item)
    );
  }, [images]);

  const onCompletePost = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: React.SetStateAction<string>;
  }) => {
    setValue("address", data.address);
  };

  //   registerLocale("ko", ko);
  return (
    <div
      className={`w-full min-w-[280px]  mx-auto mt-[26px] pb-10 ${
        imgPreviewOnOff ? "overflow-y-hidden" : ""
      }`}
    >
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
            readOnly
            onClick={() => setAddressModal(!addressModal)}
            value={getValues("address") && getValues("address")}
          />
          <button
            type="button"
            className="w-[20%] rounded-lg h-11 bg-homeGymPrice-green text-white"
            onClick={() => setAddressModal(!addressModal)}
          >
            주소찾기
          </button>
        </div>
        {addressModal && (
          <div>
            <DaumPostcode
              autoClose
              onComplete={onCompletePost}
              style={{ width: "100%", height: "500px" }}
              className="absolute z-[9999] h-[440px] top-[42.8%] left-1/2 transform -translate-x-1/2 -translate-y-[49%] bg-white border "
            />
          </div>
        )}
        <input
          type="text"
          {...register("detailAddress", { required: true })}
          placeholder="상세 주소를 입력해주세요"
          className={inputStyle}
        />

        {/* 편의사항 */}
        <p className={subTitleStyle}>편의사항</p>
        <div className="mx-5 h-11 mt-2  ">
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
            {...(register("convenienceTypes"), { required: true })}
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
            max={startAMPM === "오후" ? 12 : 24}
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
            min={
              closeAMPM === "오전"
                ? Number(getValues("openTime"))
                  ? Number(getValues("openTime")) + 1
                  : 0
                : 12
            }
            max={
              closeAMPM === "오후"
                ? Number(getValues("openTime"))
                  ? Number(getValues("openTime")) + 1
                  : 12
                : 24
            }
          />
        </div>

        {/* 공간 타입 */}
        <p className={subTitleStyle}>편의사항</p>
        <div className="mx-5 h-11 mt-2  ">
          <div>
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
        </div>

        {/* 사진 입력 */}
        <p className={subTitleStyle}>이미지</p>
        <div className="flex flex-wrap gap-2 mx-5 ">
          {images.length > 0 &&
            images.map((item) => (
              <div className="mt-2">
                <div className="relative">
                  <img
                    src={item.preview}
                    alt="dummy"
                    width="80"
                    height="80"
                    className="relative w-20 h-20  rounded-xl"
                    onClick={() => {
                      setImgPreviewImgUrl(item.preview);
                      setImgPreviewOnOff(!imgPreviewOnOff);
                      bodyTag.style.overflow = "hidden";
                    }}
                  />
                  <button
                    type="button"
                    className="absolute -top-3 -right-3 bg-delete bg-no-repeat bg-cover bg-center w-8 h-8"
                    onClick={() => {
                      setImages(images.filter((i) => i.raw !== item.raw));
                    }}
                  ></button>
                </div>
                {imgPreviewOnOff && (
                  <ImagePreview
                    url={imgPreviewImgUrl}
                    setImgPreviewOnOff={setImgPreviewOnOff}
                  />
                )}
              </div>
            ))}
          <input
            type="button"
            onClick={() => {
              fileInput.current && fileInput.current.click();
            }}
            className="w-20 h-20 mt-2 mb-8 bg-upload bg-no-repeat bg-cover bg-center"
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
        <button
          type="submit"
          className={`max-w-[100% - 40px] mx-5 h-12 rounded-lg  mb-5 ${
            finish === false ? "bg-non-selected-gray" : "bg-selected-green"
          }`}
          disabled={!finish}
        >
          등록
        </button>
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
      </form>
    </div>
  );
}
