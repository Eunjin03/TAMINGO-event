import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../assets/icons/logo.svg";

import { getParticipantCount } from "../supabase"; // 참가자 수 가져오는 함수 임포트

export default function StartPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/shooting");
  };

  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const total = await getParticipantCount();
      setCount(total);
    };
    fetchCount();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-14">
      <img src={logo} alt="logo" className="w-120 mb-8" />
      <p className="text-[#22C7A9] font-paperlogy-700 text-[20px] mb-4">
        오늘 &nbsp;
        <span className="text-[#FF8FAB]">{count !== null ? count : "..."}</span>
        명이 <span className="text-[#FF8FAB]">타밍고 스냅</span>으로 추억을
        남겼어요! <br />
        당신도 <span className="text-[#FF8FAB]">타밍고 스냅</span>으로{" "}
        <span className="text-[#FF8FAB]">특별한 순간</span>을 기록해보세요!
      </p>
      <button
        onClick={handleStart}
        className="mt-[75px] flex justify-center items-center w-[288px] h-[75px] px-[11px] py-[17px] rounded-[10px] bg-[#22C7A9] shadow-[0_4px_20px_#92D1C6] text-[30px] text-white font-paperlogy-700"
      >
        시작하기
      </button>
    </div>
  );
}
