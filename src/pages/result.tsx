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
    <div className="flex flex-col items-center justify-center h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-8">📸 사진이 완성되었습니다!</h1>

      <div className="flex flex-col md:flex-row items-center gap-10 bg-gray-50 p-8 rounded-3xl shadow-2xl">
        {/* 최종 사진 미리보기 */}
        <div className="flex flex-col items-center">
          <p className="mb-2 text-gray-500 font-medium">Your Snap</p>
          <img
            src={imageUrl}
            alt="Result"
            className="w-64 rounded-lg shadow-md border-4 border-white"
          />
        </div>

        {/* QR 코드 영역 */}
        <div className="flex flex-col items-center border-l-0 md:border-l md:pl-10 border-gray-200">
          <p className="mb-4 text-gray-600 font-bold text-center">
            QR 코드를 스캔하여
            <br />
            폰에 저장하세요!
          </p>
          <div className="bg-white p-3 rounded-xl shadow-inner border">
            <QRCodeSVG value={imageUrl} size={180} />
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-12 px-8 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition"
      >
        처음으로
      </button>
    </div>
  );
}
