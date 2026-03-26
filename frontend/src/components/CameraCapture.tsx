import { useRef, useState, useEffect } from "react";

export default function CameraCapture({ onCapture }: any) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((s) => {
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    });

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const capture = () => {
    const canvas = canvasRef.current!;
    const video = videoRef.current!;
    const context = canvas.getContext("2d")!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      onCapture(blob);
    });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay width="300" />
      <br />
      <button onClick={capture}>Capture</button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}