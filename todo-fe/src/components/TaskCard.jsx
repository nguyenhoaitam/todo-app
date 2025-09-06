import {CalendarDays, AlarmClockCheck, Ellipsis} from "lucide-react";

export default function TaskCard({ task}) {
  return (
    <div className="bg-gray-100 mt-2 shadow p-3 rounded-full flex justify-between items-center">
      <div>
        <div className="flex mb-1">
          <div className="flex justify-ceter items-center mr-2">
            <CalendarDays className="p-1"/> Hôm nay
          </div>
          <div className="flex">
            <AlarmClockCheck className="p-1"/> 18:00
          </div>
        </div>
        <span className="pl-1 text-lg">{task.title}</span>
      </div>
      <div className="bg-white rounded-full p-2"><Ellipsis/></div>
      
      
    </div>
  );
}

