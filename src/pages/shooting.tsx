import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRef, useCallback, useState } from "react";

export default function ShootingPage() {
  const videoConstraints = {
    width: 942,
    height: 482,
    facingMode: "user",
  };

  const webcamRef = useRef<Webcam | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    // Check if webcamRef.current is not null before calling getScreenshot()
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
    }
  }, [webcamRef]); // Include webcamRef in the dependency array

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Webcam
        audio={false}
        height={482}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={942}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture</button>
      {imageSrc && <img src={imageSrc} alt="Captured" />}
    </div>
  );
}
