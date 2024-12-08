"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

const CalendarModal = ({
  isOpen,
  onClose,
  onDateSelect,
  selectedDate: initialSelectedDate,
}: CalendarModalProps) => {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    initialSelectedDate,
  );

  const daysOfWeek = useMemo(
    () => ["월", "화", "수", "목", "금", "토", "일"],
    [],
  );

  const getFormattedDate = useCallback(
    (year: number, month: number, date: number) => {
      const dayOfWeek = daysOfWeek[new Date(year, month, date).getDay()];
      return `${year}년 ${month + 1}월 ${date}일 ${dayOfWeek}`;
    },
    [daysOfWeek],
  );

  useEffect(() => {
    if (isOpen && !selectedDate)
      setSelectedDate(
        getFormattedDate(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        ),
      );
  }, [isOpen, selectedDate, getFormattedDate, today]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const dates = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1,
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else setCurrentMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else setCurrentMonth((prev) => prev + 1);
  };

  const handleDateSelect = (date: number) => {
    const formattedDate = getFormattedDate(currentYear, currentMonth, date);
    setSelectedDate(formattedDate);
  };

  const handleComplete = () => {
    if (selectedDate) onDateSelect(selectedDate);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-grey-800 p-6 text-white">
        <div className="mb-9 flex items-center justify-between text-xl">
          <span>언제 보낼까요?</span>
          <button onClick={onClose} aria-label="닫기">
            <Image src="/icons/close.png" width={28} height={28} alt="close" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="text-xl text-white"
            onClick={handlePrevMonth}
            aria-label="이전 달"
          >
            &lt;
          </button>
          <h2 className="text-lg font-semibold">
            {currentYear}.{currentMonth + 1}
          </h2>
          <button
            className="text-xl text-white"
            onClick={handleNextMonth}
            aria-label="다음 달"
          >
            &gt;
          </button>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-7 gap-2 text-center">
            {daysOfWeek.map((day) => (
              <div key={day} className="font-semibold text-gray-400">
                {day}
              </div>
            ))}
          </div>
          <hr className="my-2 border-gray-600" />
          <div className="grid grid-cols-7 gap-2 text-center">
            {dates.map((date) => {
              const formattedDate = getFormattedDate(
                currentYear,
                currentMonth,
                date,
              );
              const isSelected = selectedDate === formattedDate;
              const isPastDate =
                new Date(currentYear, currentMonth, date) <
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                );

              return (
                <button
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className={`h-10 w-10 rounded-full ${
                    isSelected
                      ? "bg-primary-700 text-white"
                      : isPastDate
                        ? "text-gray-500"
                        : "text-gray-200 hover:bg-primary-700"
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
          <hr className="mb-0 mt-2 border-gray-600" />
        </div>
        <div className="mt-3 text-center">
          <p className="text-md mb-4 text-left text-grey-400">
            {selectedDate}요일
          </p>
          <button
            onClick={handleComplete}
            className="mt-4 w-full rounded-md bg-white py-4 font-semibold text-black"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
