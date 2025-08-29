import { useState } from "react";

export default function () {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="h-screen">
        <img src={`${process.env.PUBLIC_URL}/images/todo.jpg`} alt="Image" />
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
            <button>Đăng ký</button>
          </form>
        </div>
      </div>
    </>
  );
}
