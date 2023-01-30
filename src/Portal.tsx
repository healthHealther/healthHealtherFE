import ReactDOM from "react-dom";

import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalOnOffState } from "./common";

interface PortalProps {
  children: React.ReactNode;
  setState: Dispatch<SetStateAction<boolean>>;
  state: boolean;
}

export default function Portal({ children, setState, state }: PortalProps) {
  return ReactDOM.createPortal(
    <div className="fixed left-0 top-0 h-full w-full flex items-center justify-center z-10 overflow-hidden">
      {children}
      <label
        onClick={() => state && setState(!state)}
        className="absolute bg-black h-full w-full opacity-50"
      ></label>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
}
