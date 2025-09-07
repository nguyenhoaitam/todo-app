import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

import {
  BellDot,
  LayoutGrid,
  Clock,
  ClockAlert,
  AlarmClock,
  LayoutList,
  AlarmClockCheck,
  CalendarDays,
  Ellipsis,
} from "lucide-react";


export default function () {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState({ overdue: 0, due: 0, all: 0 });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data));
  }, []);

  const fetchTodayTasks = async () => {
    const res = await axios.get("/tasks/today/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const fetchTaskCounts = async () => {
    const due = await axios.get("tasks/due/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const overdue = await axios.get("tasks/overdue/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const all = await axios.get("tasks/all", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCount({
      due: due.data.length,
      overdue: overdue.data.length,
      all: all.data.length,
    });
  };

  useEffect(() => {
    fetchTodayTasks();
    fetchTaskCounts();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div>
          {user && <p className="font-medium">Xin chào {user.username},</p>}
          <p className="text-sm text-gray-600">Bạn có hoạt động hôm nay</p>
        </div>
        <div className="flex justify-end items-center p-2">
          <BellDot className="m-1" />
          <LayoutGrid className="m-1" />
        </div>
      </div>
      <div className="grid grid-cols-2 content-start gap-4 mt-4">
        <Link to="/tasks/today">
          <div className="w-full bg-purple-300 px-2 pt-2 rounded-xl">
          <Clock className="bg-white p-1 rounded-lg" />
          <div className="flex justify-between py-2">
            <p>Hôm nay</p>
            <p>{tasks.length}</p>
          </div>
        </div>
        </Link>
        <Link to="/tasks/due">
          <div className="w-full bg-red-300 px-2 pt-2 rounded-xl">
          <AlarmClock className="bg-white p-1 rounded-lg" />
          <div className="flex justify-between py-2">
            <p>Đến hạn</p>
            <p>{count.due}</p>
          </div>
        </div>
        </Link>
        <Link to="/tasks/all">
          <div className="w-full bg-green-300 px-2 pt-2 rounded-xl">
            <LayoutList className="bg-white p-1 rounded-lg" />
            <div className="flex justify-between py-2">
              <p>Tất cả</p>
              <p>{count.all}</p>
            </div>
          </div>
        </Link>
        <Link to="/tasks/overdue">
          <div className="w-full bg-pink-300 px-2 pt-2 rounded-xl">
            <ClockAlert className="bg-white p-1 rounded-lg" />
            <div className="flex justify-between py-2">
              <p>Quá hạn</p>
              <p>{count.overdue}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-4">
        <p>Hoạt động hôm nay</p>
        <div className="grid gap-2">
          {tasks.map((task) => (
            <div className="bg-gray-100 mt-2 shadow p-3 rounded-full flex justify-between items-center">
              <div>
                <div className="flex mb-1">
                  <div className="flex justify-ceter items-center mr-2">
                    <CalendarDays className="p-1" /> Hôm nay
                  </div>
                  <div className="flex">
                    <AlarmClockCheck className="p-1" /> 23:59
                  </div>
                </div>
                <span className="pl-1 text-lg">{task.title}</span>
              </div>
              <div className="bg-white rounded-full p-2">
                <Ellipsis />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
