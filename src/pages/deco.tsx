import { useLocation } from "react-router-dom";
import frame1 from "../assets/frame1.png";

export default function DecoPage() {
  const location = useLocation();

  const img = location.state?.img;

  if (!img) {
    return <div>사진을 불러올 수 없습니다. 다시 촬영해 주세요!</div>;
  }

  const combineImageAndFrame = async (
    userPhotoBase64: string,
    frameImageUrl: string,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      const photo = new Image();
      const frame = new Image();

      // 1. 프레임을 먼저 로드합니다 (캔버스 크기 결정의 기준)
      frame.src = frameImageUrl;
      frame.onload = () => {
        // 캔버스 크기를 프레임 이미지의 실제 해상도에 맞춥니다.
        canvas.width = frame.naturalWidth;
        canvas.height = frame.naturalHeight;

        photo.src = userPhotoBase64;
        photo.onload = () => {
          // 2. 사진을 먼저 그립니다.
          // 위치: (30, 30), 크기: (643, 483)으로 고정하여 그립니다.
          ctx.drawImage(photo, 30, 30, 643, 483);

          // 3. 그 위에 프레임 PNG를 겹쳐 그립니다.
          // 프레임은 캔버스 전체(0, 0)에 꽉 차게 그립니다.
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

          // 4. 최종 결과물을 반환합니다.
          resolve(canvas.toDataURL("image/png"));
        };

        photo.onerror = () => reject(new Error("사진 로드 실패"));
      };

      frame.onerror = () => reject(new Error("프레임 로드 실패"));
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <img src={img} alt="Captured" className="max-w-full h-auto" />
        <div className="flex flex-col">
          <div
            onClick={() => {
              combineImageAndFrame(img, frame1).then((combinedImage) => {
                const link = document.createElement("a");
                link.href = combinedImage;
                link.download = "combined-image.png";
                link.click();
              });
            }}
          >
            <img src={frame1} alt="Frame 1" />
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
}
