import { useState } from "react";
import API from "../api";
import CameraCapture from "../components/CameraCapture";

export default function Login() {
  const [image, setImage] = useState<Blob | null>(null);

  const handleLogin = async () => {
    if (!image) return alert("Capture image first");

    const formData = new FormData();
    formData.append("file", image, "capture.png");

    try {
      const res = await API.post("/login-face", formData);
      alert(`Welcome ${res.data.user}`);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login with Face</h2>

      <CameraCapture onCapture={setImage} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}