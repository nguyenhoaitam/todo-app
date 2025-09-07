import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";

export default function TaskListPage() {
  const { type } = useParams();
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const colors = [
    "bg-pink-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-orange-100",
    "bg-teal-100",
  ];

  const fetchTasks = async () => {
    const res = await axios.get(`/tasks/${type}`, {
        headers: {Authorization: `Bearer ${token}`},
    });

    setTasks(res.data)
  };

  useEffect(() => {
    fetchTasks();
  }, [type]);

  return (
    <div className="p-4">
        <h2 className="font-bold mb-4 ml-1">
        {type === "today" && "Công việc hôm nay"}
        {type === "due" && "Công việc đến hạn"}
        {type === "overdue" && "Công việc quá hạn"}
        {type === "all" && "Tất cả công việc"}
      </h2>
      {tasks.map((task, index) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
        <div key={task.id} className={index !== 0 ? "-mt-4" : ""}>
          <TaskCard task={task} color={randomColor}/>
        </div>
      )})}
    </div>
  );
}
