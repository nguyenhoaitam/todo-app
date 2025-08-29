import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const hanldLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Vui lòng nhập đủ thông tin");
      return;
    }

    try {
      const res = axios.post("/auth/login/", { email, password });
      localStorage.setItem("token", (await res).data.token);
      nav("/dashboard");
    } catch (err) {
      if (err.response)
        setError("Email hoặc mật khẩu không đúng");
      else
        setError("Đăng nhập thất bại");
    }
  };
  return (
    <>
      <div className="h-screen">
        <img src={`${process.env.PUBLIC_URL}/images/todo.jpg`} alt="Image" />

        <div className="flex justify-center items-center mt-8">
          <form className="p-4 rounded w-80">
            <h3 className="text-xl text-center font-bold mb-4">Đăng nhập</h3>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="bg-button font-medium text-white w-full py-2 rounded"
              onClick={hanldLogin}
            >
              Đăng nhập
            </button>
            <p className="mt-3 text-sm text-right">
              Chưa có tài khoản?{" "}
              <a href="/register" className="text-button">
                Đăng ký
              </a>
            </p>
            {error && (
                <p className="text-red-500 text-center text-sm mt-2">{error}</p>
            )}
          </form>
        </div>

        <div className="w-80 mx-auto mt-8">
          <button className="bg-button font-medium text-white w-full py-2 rounded mt-4">
            Đăng nhập với Facebook
          </button>
          <button className="bg-button font-medium text-white w-full py-2 rounded mt-4">
            Đăng nhập với Google
          </button>
        </div>
      </div>
    </>
  );
}
