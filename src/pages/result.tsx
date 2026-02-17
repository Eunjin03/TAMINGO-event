import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // npm install qrcode.react 설치 필요

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ShootingPage에서 넘겨받은 이미지 URL
  const imageUrl = location.state?.url;

  if (!imageUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>이미지가 존재하지 않습니다.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-500 underline"
        >
          처음으로
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[39px] mt-[80px]">
      <div className="flex items-center gap-[86px]">
        {/* 최종 사진 미리보기 */}

        <img src={imageUrl} alt="Result" className="w-[643px]" />

        {/* QR 코드 영역 */}
        <div className="flex flex-col items-center justify-center ">
          <p className="mb-4 text-[#22C7A9] font-paperlogy-700 text-[20px] text-center">
            QR 코드를 스캔하여
            <br />
            폰에 저장하세요!
          </p>
          <div className="bg-white p-[20px] rounded-[10px] shadow-inner border-2 border-[#22C7A9]">
            <QRCodeSVG value={imageUrl} size={180} />
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="flex justify-center items-center w-[288px] h-[75px] px-[11px] py-[17px] rounded-[10px] bg-[#22C7A9] shadow-[0_4px_20px_#92D1C6] text-[30px] text-white font-paperlogy-700"
      >
        처음으로
      </button>
    </div>
  );
}
