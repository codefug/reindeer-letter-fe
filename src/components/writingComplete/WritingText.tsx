"use client";

import { useSearchParams } from "next/navigation";

export default function WritingText() {
  const searchParams = useSearchParams();
  const nickNamequery = searchParams.get("nickName") ?? "";
  const nickName = decodeURIComponent(nickNamequery);

  return (
    <div className="mt-auto flex items-center justify-center text-center text-xl font-bold">
      {nickName}에게
      <br />
      편지를 보냈습니다!
    </div>
  );
}
