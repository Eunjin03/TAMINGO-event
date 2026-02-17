import { useNavigate } from "react-router-dom";

import logo from "../assets/icons/logo.svg";

export default function StartPage() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/shooting");
  };
  return (
    <div className="flex flex-col items-center justify-start h-screen mt-16">
      <img src={logo} alt="logo" className="w-120 mb-8" />
      <button
        onClick={handleStart}
        className="mt-[86px] flex justify-center items-center w-[288px] h-[75px] px-[11px] py-[17px] rounded-[10px] bg-[#22C7A9] shadow-[0_4px_20px_#92D1C6] text-[30px] text-white font-paperlogy-700"
      >
        시작하기
      </button>
    </div>
  );
}
