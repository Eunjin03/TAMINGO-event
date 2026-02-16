import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRef, useCallback } from "react";

export default function ShootingPage() {
  const videoConstraints = {
    width: 643,
    height: 483,
    facingMode: "user",
  };

  const navigate = useNavigate();
  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    // 1. 이미지 객체 생성
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");

      // 2. 내가 원하는 최종 결과물 사이즈 설정 (예: 800x600)
      const targetWidth = 643;
      const targetHeight = 483;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // 3. 제단(Crop) 로직
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        // 원본 이미지의 중앙을 기준으로 자르는 예시입니다.
        const sourceWidth = img.width;
        const sourceHeight = img.height;

        // 중앙 정렬 계산
        const ratio = Math.max(
          targetWidth / sourceWidth,
          targetHeight / sourceHeight,
        );
        const newWidth = sourceWidth * ratio;
        const newHeight = sourceHeight * ratio;
        const x = (targetWidth - newWidth) / 2;
        const y = (targetHeight - newHeight) / 2;

        ctx.drawImage(img, x, y, newWidth, newHeight);

        // 4. 가공된 이미지를 넘기기
        const croppedImage = canvas.toDataURL("image/png");
        navigate("/deco", { state: { img: croppedImage } });
      }
    };
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Webcam
        audio={false}
        height={483}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={643}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture</button>
    </div>
  );
}
