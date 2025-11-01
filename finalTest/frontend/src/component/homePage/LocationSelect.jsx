import React, { useState } from "react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Responsive } from "../Reponsive.js";
const locations = [
    {group:"Famous" , items: ["TP.Hồ Chí Minh" , "Hà Nội", "Đà Nẵng" , "Phú Quốc (Kiên Giang)","Nha Trang (Khánh Hòa)","Đà Lạt (Lâm Đồng)"]},
  { group: "Miền Nam", items: ["TP. Hồ Chí Minh","Vùng Tàu", "Long An", "Trà Vinh", "Cần Thơ"] },
  { group: "Miền Trung", items: ["Quy Nhơn (Bình Định)", "Huế", "Buôn Ma Thuột", "Vinh", "Cam Ranh", "Bảo Lộc (Lâm Đồng)"] },
  { group: "Miền Bắc", items: ["Hà Nội", "Hải Phòng", "Ninh Bình", "Quảng Ninh", "SaPa", "Nam Định"] },
];

const PickupLocationSelect = ({ onChange }) => {
  const [selected, setSelected] = useState("TP. Hồ Chí Minh");
  const [open, setOpen] = useState(false);

  const handleSelect = (loc) => {
    setSelected(loc);
    setOpen(false);
    if (onChange) onChange(loc); // callback cho parent (nếu cần)
  };

  return (
    <div className="w-100 relative"responsive={Responsive}>
      {/* Nút chọn location */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between bg-white items-center  px-3 py-2 rounded-lg text-left shadow-sm"
      >
        <span className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-gray-500" />
          {selected}
        </span>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </button>

      {/* Menu xổ xuống */}
      {open && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-lg max-h-28 overflow-auto z-10">
          {locations.map((group, idx) => (
            <div key={idx} className="border-b last:border-0">
              <p className="px-3 py-2 text-sm text-gray-500 font-semibold">
                {group.group}
              </p>
              {group.items.map((loc) => (
                <div
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className="cursor-pointer px-4 py-2 hover:bg-red-100 hover:text-red-600"
                >
                  {loc}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickupLocationSelect;
