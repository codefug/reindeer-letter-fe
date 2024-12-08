"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface BackButtonProps {
  isLoggedIn: boolean;
}

export default function BackButton({ isLoggedIn }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (isLoggedIn) router.push("/home");
    else router.push("/invitation");
  };

  return (
    <button
      onClick={handleClick}
      className="z-50 ml-auto flex items-center pr-5 pt-4"
    >
      <Image src="/images/close.svg" alt="close" width={28} height={28} />
    </button>
  );
}
