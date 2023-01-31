import React, { useState, useEffect } from "react";

import axios from "axios";
interface NewCommentProps {
  getCommentList: () => Promise<void>;
  contentId: number;
}
export default function NewComment(props: NewCommentProps) {
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const [valueValidate, setValueValidate] = useState(false);
  const [textBox, setTextBox] = useState("");
  useEffect(() => {
    textBox.length ? setValueValidate(true) : setValueValidate(false);
  }, [textBox]);
  const handleSubmit = async () => {
    if (textBox.length !== 0) {
      try {
        return await axios
          .post(
            `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/${props.contentId}/comment`,
            { context: textBox },
            { headers: { Authorization: token } }
          )
          .then(() => {
            setTextBox("");
            props.getCommentList();
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="pb-[60px] ">
      <form action="" className="flex ">
        <textarea
          className="p-[10px] resize-none break-words leading-[24px] min-h-[92px] w-[83%] border border-[#d9d9d9] rounded-[8px] mr-[10px]"
          onChange={(e) => {
            setTextBox(e.target.value);
          }}
          placeholder="댓글을 입력하세요"
          value={textBox}
          required
        />
        <button
          className={`text-white rounded-[8px] w-[14%] h-[92px] ${
            valueValidate
              ? "bg-[#08bd9d] hover:bg-[#009d81]"
              : "bg-[#c4c4c4] hover:bg-[#a5a5a5]"
          }`}
          type="button"
          //   늦게바뀌는거 손봐야함
          onClick={handleSubmit}
        >
          등록
        </button>
      </form>
    </div>
  );
}
