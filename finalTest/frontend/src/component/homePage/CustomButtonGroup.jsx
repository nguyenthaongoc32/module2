import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomButtonGroup = ({ next, previous }) => {
  return (
    <div className="absolute top-1/2 w-full -translate-y-1/2 pointer-events-none">
      {/* Nút trái */}
      <button
        onClick={previous}
        className="absolute left-[-100px] bg-black/60 hover:bg-black text-white rounded-full p-3 shadow-lg transition pointer-events-auto"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Nút phải */}
      <button
        onClick={next}
        className="absolute right-[200px] bg-black/60 hover:bg-black text-white rounded-full p-3 shadow-lg transition pointer-events-auto"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CustomButtonGroup;
