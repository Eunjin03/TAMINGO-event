import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import frame1 from "../assets/frame 1.png";
import frame2 from "../assets/frame 2.png";
import frame3 from "../assets/frame 3.png";
import frame4 from "../assets/frame 4.png";
import { createClient } from "@supabase/supabase-js";

// Vite 전용 환경 변수 호출 방식
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DecoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrlState, setPreviewUrlState] = useState<string>("");

  const img = location.state?.img;

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const combinedImage = await combineImageAndFrame(img, frame1);
        setPreviewUrlState(combinedImage);
      } catch (error) {
        console.error("미리보기 생성 실패:", error);
        setPreviewUrlState(img);
      }
    };

    if (img) {
      loadPreview();
    }
  }, [img]);

  if (!img) {
    return <div>사진을 불러올 수 없습니다. 다시 촬영해 주세요!</div>;
  }

  // 이미지 합성 함수 (기존 로직 유지)
  const combineImageAndFrame = async (
    userPhotoBase64: string,
    frameImageUrl: string,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const photo = new Image();
      const frame = new Image();

      frame.src = frameImageUrl;
      frame.onload = () => {
        canvas.width = frame.naturalWidth;
        canvas.height = frame.naturalHeight;
        photo.src = userPhotoBase64;
        photo.onload = () => {
          ctx.drawImage(photo, 42, 43, 619, 443);
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/png"));
        };
        photo.onerror = () => reject(new Error("사진 로드 실패"));
      };
      frame.onerror = () => reject(new Error("프레임 로드 실패"));
    });
  };

  // 합성 후 Supabase에 업로드하고 페이지를 이동시키는 핸들러
  const handleComplete = async () => {
    if (isUploading) return;
    setIsUploading(true);

    try {
      // // 1. 이미지 합성
      // const combinedImage = await combineImageAndFrame(img, frameUrl);

      // 2. Base64를 Blob으로 변환
      const blob = await (await fetch(previewUrlState)).blob();
      const fileName = `tamingo_${Date.now()}.png`;

      // 3. Supabase Storage 업로드
      const { error } = await supabase.storage
        .from("photos") // 설정하신 버킷 이름
        .upload(fileName, blob, {
          contentType: "image/png",
        });

      if (error) throw error;

      // 4. 업로드된 파일의 Public URL 가져오기
      const {
        data: { publicUrl },
      } = supabase.storage.from("photos").getPublicUrl(fileName);

      // 5. 결과 페이지로 URL을 가지고 이동
      navigate("/result", { state: { url: publicUrl } });
    } catch (error) {
      console.error("처리 중 에러 발생:", error);
      alert("사진 저장에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  const clickFrame = (frameUrl: string) => {
    setPreviewUrlState("");
    combineImageAndFrame(img, frameUrl)
      .then((combined) => setPreviewUrlState(combined))
      .catch((error) => {
        console.error("프레임 적용 실패:", error);
        alert("프레임 적용에 실패했습니다. 다시 시도해 주세요.");
      });
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center mt-[50px]">
        <div className="flex items-center justify-center gap-[56px]">
          {/* 왼쪽: 찍은 사진 미리보기 */}
          <div className="mr-8">
            <img src={previewUrlState} alt="Captured" className="w-[680px]" />
          </div>

          {/* 오른쪽: 프레임 선택 영역 */}
          <div className="flex flex-col gap-3 items-center justify-center border-2 border-[#22C7A9] bg-gray-100 rounded-lg p-4">
            <div
              className="cursor-pointer hover:scale-105 transition-transform border-4 border-transparent hover:border-[#FF8FAB] rounded-lg overflow-hidden"
              onClick={() => clickFrame(frame1)}
            >
              <img src={frame1} alt="Frame 1" className="w-40" />
            </div>
            <div
              className="cursor-pointer hover:scale-105 transition-transform border-4 border-transparent hover:border-[#FF8FAB] rounded-lg overflow-hidden"
              onClick={() => clickFrame(frame2)}
            >
              <img src={frame2} alt="Frame 2" className="w-40" />
            </div>
            <div
              className="cursor-pointer hover:scale-105 transition-transform border-4 border-transparent hover:border-[#FF8FAB] rounded-lg overflow-hidden"
              onClick={() => clickFrame(frame3)}
            >
              <img src={frame3} alt="Frame 3" className="w-40" />
            </div>
            <div
              className="cursor-pointer hover:scale-105 transition-transform border-4 border-transparent hover:border-[#FF8FAB] rounded-lg overflow-hidden"
              onClick={() => clickFrame(frame4)}
            >
              <img src={frame4} alt="Frame 4" className="w-40" />
            </div>
          </div>
        </div>
        <button
          onClick={() => handleComplete()}
          className="flex justify-center items-center w-[288px] h-[75px] px-[11px] py-[17px] rounded-[10px] bg-[#22C7A9] shadow-[0_4px_20px_#92D1C6] text-[30px] text-white font-paperlogy-700"
        >
          다운 받기
        </button>
      </div>

      {/* 로딩 표시 */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl font-bold font-paperlogy-700">
              타밍고와 데모데이 추억 사진 만드는 중...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
