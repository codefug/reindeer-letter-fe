"use client";

import Lottie from "lottie-react";
import { useState } from "react";
import letterSend from "../../public/letter_send.json";

export default function LottieLetterSend({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex min-h-svh w-full items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <Lottie
        loop={false}
        animationData={letterSend}
        style={{ width: "351px", height: "100%" }}
        onComplete={handleComplete}
      />
    </div>
  );
}
