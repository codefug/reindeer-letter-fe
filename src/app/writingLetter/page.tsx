"use client";

import instance from "@/api/instance";
import { useState } from "react";
import Header from "@/components/header";
import "../globals.css";
import Image from "next/image";
import PopUp from "@/components/popUp";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/button";
import useOverlay from "@/hooks/useoverlay";
import CalendarModal from "@/components/writingLetter/CalendarModal";
import ActionBar from "@/components/writingLetter/ActionBar";
import NavBar from "@/components/NavBar";

const formatDate = (date: Date) => {
  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;
};

const calculateDaysDifference = (selectedDate: string): number | null => {
  if (!selectedDate) return null;

  const [year, month, day] = selectedDate
    .replace(/년|월|일/g, "")
    .trim()
    .split(" ")
    .map(Number);

  const today = new Date();
  const selected = new Date(year, month - 1, day);

  const diffInMs = selected.getTime() - today.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

const Page = () => {
  const overlay = useOverlay();
  const today = new Date();
  const todayFormatted = formatDate(today);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("type");
  const nickname = searchParams.get("nickname");
  const receiverId = searchParams.get("receiverId");
  const receiverNickName = searchParams.get("receiverNickName");

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const daysDifference = calculateDaysDifference(selectedDate);

  const handleSubmitLetter = async () => {
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!nickname) {
      alert("닉네임이 없습니다. 다시 시도해주세요.");
      return;
    }

    try {
      const [year, month, day] = selectedDate
        .replace(/년|월|일/g, "")
        .trim()
        .split(" ")
        .map(Number);

      const scheduledAt = `${year}-${String(month).padStart(2, "0")}-${String(
        day,
      ).padStart(2, "0")}`;
      const response = await instance.post("/letters", {
        title,
        description,
        imageUrl: "https://example.com/image.jpg",
        bgmUrl: "https://example.com/music.mp3",
        category,
        receiverId: Number(receiverId),
        isOpen: false,
        scheduledAt,
        senderNickName: nickname,
      });

      if (response.status === 201) {
        overlay.unmount();
        router.push(`/writingComplete?nickname=${receiverNickName}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        alert(`편지 작성 실패: ${JSON.stringify(error.response?.data)}`);
    }
  };

  const handleOpenPopUp = () => {
    overlay.mount(
      <PopUp
        button="전달하기"
        description="한 번 보낸 기억은 취소할 수 없습니다."
        title="기억을 전달할까요?"
        onConfirm={handleSubmitLetter}
        onCancel={() => overlay.unmount()}
        unmount={overlay.unmount}
      />,
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-grey-900 text-white">
      <div className="px-4">
        <Header />
      </div>
      <NavBar
        title="편지 작성"
        loggedBack="/setNickName"
        guestBack="/setNickName"
        loggedClose="/home"
        guestClose="/invitation"
      />

      <main className="bg-custom-background flex w-full flex-1 flex-col items-center justify-between px-4 pb-4 pt-8">
        <header className="flex w-full flex-col space-y-4 px-4">
          <ActionBar />
          <div className="w-full">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full max-w-md border-none bg-transparent font-handwriting text-3xl text-black placeholder-grey-600 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </header>

        <div className="w-full flex-1">
          <textarea
            style={{ height: "520px" }}
            placeholder="내용을 입력하세요"
            className="h-full w-full resize-none rounded-lg bg-transparent p-4 font-handwriting text-2xl text-black placeholder-grey-600 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-2 flex w-full justify-start">
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="flex space-x-2 rounded-md px-4 text-black"
          >
            <Image
              src="/writingletter/calendar.png"
              alt="달력 아이콘"
              width={24}
              height={24}
              className="h-auto w-auto"
            />
            <span className="pt-1">{selectedDate || todayFormatted}</span>
          </button>
        </div>

        <div className="w-full px-2 py-4">
          <Button
            buttonType="Primary"
            onClick={handleOpenPopUp}
            className="w-full text-black"
          >
            {daysDifference !== null
              ? daysDifference === 0
                ? "오늘 편지 보내기"
                : `${daysDifference}일 뒤 편지 보내기`
              : "오늘 편지 보내기"}
          </Button>
        </div>
      </main>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Page;
