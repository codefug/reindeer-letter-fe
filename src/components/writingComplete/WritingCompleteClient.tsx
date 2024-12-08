"use client";

import { useEffect, useState } from "react";
import LottieLetterSend from "@/components/LottieLetterSend";
import useLocalStorage from "@/hooks/useLocalStorage";
import WritingText from "./WritingText";
import BackButton from "./BackButton";

export default function WritingCompleteClient() {
  const [isLottieComplete, setIsLottieComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <BackButton isLoggedIn={isLoggedIn} />
      <LottieLetterSend onComplete={() => setIsLottieComplete(true)} />
      {isLottieComplete && (
        <>
          <div className="flex-1" />
          <WritingText />
          <div className="flex-1" />
          <div className="relative">
            {!isLoggedIn && showBubble && (
              <div className="absolute -top-[30px] left-1/2 z-10 w-[310px] -translate-x-1/2 rounded-[4px] bg-[#762222] px-[4px] py-[6px] text-black">
                <div className="absolute -bottom-[5.5px] left-1/2 h-[11px] w-[9px] -translate-x-1/2 rotate-45 transform bg-[#762222]" />
                <div className="relative z-10 text-center text-sm font-semibold text-white">
                  내 편지함을 만들고 친구들에게 편지를 받아보세요!
                  <button onClick={() => setShowBubble(false)}>
                    <div className="h-[20px] w-[20px] text-[20px] text-white">
                      ×
                    </div>
                  </button>
                </div>
              </div>
            )}
            <div className="z-[51] flex h-[116px] w-full justify-center p-[16px]">
              <div className="flex h-[56px] w-[350px] items-center justify-center rounded-md bg-white text-black">
                {isLoggedIn ? "다른 편지 더 선물하기" : "내 편지함 만들기"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
