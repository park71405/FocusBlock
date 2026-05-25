import { interText } from "../../lib/styles";
import { cn } from "../../lib/utils";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaRegUserCircle, FaRegCalendarAlt } from "react-icons/fa";

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayList[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayName})`;
};

export default function TaskHeaderSection({ sysDate, onDateChange }: { sysDate: Date; onDateChange: (date: Date) => void }) {

    const changeDate = (offset: number) => {
        const newDate = new Date(sysDate);
        newDate.setDate(newDate.getDate() + offset);
        onDateChange(newDate);
    }

    return (
        <header className="w-full border-b border-black/5 bg-[#FAF6F5]">
            <div className="flex h-17 w-full items-center justify-between px-12">
                <div className={cn(interText, "text-[22px] font-bold text-[#5B5A5D]")}>
                    FocusBlock-ToDo
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                    <button 
                        className="p-1 rounded hover:bg-gray-100 transition"
                        onClick={() => changeDate(-1)}
                    >
                        <FaAngleLeft size={18} />
                    </button>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <FaRegCalendarAlt size={18} />
                        <span>{getFormattedDate(sysDate)}</span>
                    </div>
                    <button 
                        className="p-1 rounded hover:bg-gray-100 transition"
                        onClick={() => changeDate(1)}
                    >
                        <FaAngleRight size={18} />
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition">
                        <FaRegUserCircle size={22} />
                    </button>
                </div>
            </div>
        </header>
    );
}