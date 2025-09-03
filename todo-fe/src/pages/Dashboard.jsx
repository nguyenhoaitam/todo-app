import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskCard from "../components/TaskCard";

import {
  BellDot,
  LayoutGrid,
  Clock,
  ClockAlert,
  AlarmClock,
  LayoutList,
} from "lucide-react";

export default function () {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data));
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}`},
    });
    setTasks(res.data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div>
            {user && (
          <p className="font-medium">Xin chào {user.username},</p>
          )}
          <p className="text-sm text-gray-600">Bạn có hoạt động hôm nay</p>
        </div>
        <div className="flex justify-end items-center p-2">
          <BellDot className="m-1" />
          <LayoutGrid className="m-1" />
        </div>
      </div>
      <div className="grid grid-cols-2 content-start gap-4 mt-4">
        <div className="w-full bg-purple-300 px-2 pt-2 rounded-xl">
          <Clock className="bg-white p-1 rounded-lg" />
          <div className="flex justify-between py-2">
            <p>Hôm nay</p>
            <p>6</p>
          </div>
        </div>
        <div className="w-full bg-red-300 px-2 pt-2 rounded-xl">
          <AlarmClock className="bg-white p-1 rounded-lg" />
          <div className="flex justify-between py-2">
            <p>Đến hạn</p>
            <p>5</p>
          </div>
        </div>
        <div className="w-full bg-green-300 px-2 pt-2 rounded-xl">
          <LayoutList className="bg-white p-1 rounded-lg" />
          <div className="flex justify-between py-2">
            <p>Tất cả</p>
            <p>10</p>
          </div>
        </div>
        <div className="w-full bg-pink-300 px-2 pt-2 rounded-xl">
          <ClockAlert className="bg-white p-1 rounded-lg" />
          <div className="flex justify-between py-2">
            <p>Quá hạn</p>
            <p>4</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p>Hoạt động hôm nay</p>
        <div className="grid gap-2">
            {tasks.map((task) => (
                <TaskCard key={task._id} task={task}/>
            ))}
        </div>
      </div>
    </>
  );
}
