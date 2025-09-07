import {CalendarDays, AlarmClockCheck} from "lucide-react";

export default function TaskCard({ task, color }) {
  const deadline = new Date(task.deadline);
  const date = deadline.toLocaleDateString("en-GB");
  return (
    <div className={`${color} bg-gray-100 mt-2 shadow p-3 rounded-xl py-6`}>
        <div className="flex mb-1">
          <div className="flex justify-cetner items-center mr-2">
            <CalendarDays className="p-1"/> {date.replace(/\//g, "-")}
          </div>
          <div className="flex">
            <AlarmClockCheck className="p-1"/> 23:59
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-[60%]">
            <p className="pl-1 text-lg">{task.title}</p>
            <p className="pl-1">{task.subtasks.length} công việc phụ</p>
          </div>
          <div className="w-[40%]">
            <span className="bg-white p-2 rounded-full">Hoàn thành 55</span>
          </div>
        </div>
      
    </div>
  );
}

