import { useRef, useState, useEffect } from "react";
import { interText } from "../../lib/styles";
import { cn } from "../../lib/utils";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaRegUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import { useAuth } from "../../component/context/AuthProvider";

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayList[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayName})`;
};

export default function TaskHeaderSection({ sysDate, onDateChange }: { sysDate: Date; onDateChange: (date: Date) => void }) {

    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        onClick={() => setDropdownOpen(prev => !prev)}
                    >
                        <FaRegUserCircle size={22} />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                            <div className="px-4 py-2.5 border-b border-gray-100">
                                <p className="text-xs text-gray-400">로그인 계정</p>
                                <p className="text-sm font-semibold text-gray-700 truncate">{user?.nickname}</p>
                            </div>
                            <button
                                onClick={() => { setDropdownOpen(false); logout(); }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                            >
                                로그아웃
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}