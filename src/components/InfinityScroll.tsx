import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfinityScrollProps {
  setScroll: Dispatch<SetStateAction<boolean>>;
}

export default function InfinityScroll({ setScroll }: InfinityScrollProps) {
  const [ref, inView] = useInView();

  useEffect(() => {
    setScroll(inView);
  }, [inView]);
  return (
    <>
      <div ref={ref} className="absolute bottom-6" />
    </>
  );
}
