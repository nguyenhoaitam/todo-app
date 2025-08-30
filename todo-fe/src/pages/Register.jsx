import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setError("Vui lòng nhập đủ thông tin");
      return;
    }

    try {
      await axios.post("/auth/register/", {username, email, password});
      alert("Đăng ký tài khoản thành công");
      nav("/login");
    } catch (err) {
      if (err.response) setError(err.response.data.message);
      else
          setError("Đăng ký thất bại")
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="w-80 mx-auto">
          <img src={`${process.env.PUBLIC_URL}/images/todo.jpg`} alt="Image" />
        </div>
        <div className="flex justify-center items-center mt-8">
          <form className="w-80 rounded p-4">
            <h3 className="text-xl text-center font-bold mb-4">Đăng ký</h3>
            <input
              className="w-full border p-2 mb-3"
              type="text"
              placeholder="Tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="w-full border p-2 mb-3"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full border p-2 mb-3"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              onClick={handleRegister}
              className="bg-button font-medium text-white w-full py-2 rounded"
            >
              Đăng ký
            </button>
            <p className="mt-3 text-sm text-right">
              Đã có tài khoản?{" "}
              <a href="/login" className="text-button">
                Đăng nhập
              </a>
            </p>
            {error && (
              <p className="text-red-500 text-center text-sm mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
