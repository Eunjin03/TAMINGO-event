import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/shooting");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleStart}
        className="text-2xl font-paperlogy-500 bg-blue-500 text-black px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        시작하기
      </button>
    </div>
  );
}
