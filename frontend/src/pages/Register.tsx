import { useState } from "react";
import CameraCapture from "../components/CameraCapture";
import API from "../api";
export default function Register() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<Blob | null>(null);

  const handleSubmit = async () => {
    if (!name || !image) return alert("Enter name and capture image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", image, "capture.png");

    try {
      const res = await API.post("/register-face", formData);
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div>
      <h2>Register Face</h2>

      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />

      <CameraCapture onCapture={setImage} />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}