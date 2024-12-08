"use client";

import dynamic from "next/dynamic";

const WritingCompleteClientWithNoSSR = dynamic(
  () => import("../../components/writingComplete/WritingCompleteClient"),
  { ssr: false },
);

const HeaderWithNoSSR = dynamic(() => import("../../components/header"), {
  ssr: false,
});

export default function WritingComplete() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#C396C2] to-[#7BA1D2]">
        <HeaderWithNoSSR />
        <WritingCompleteClientWithNoSSR />
      </div>
    </>
  );
}
