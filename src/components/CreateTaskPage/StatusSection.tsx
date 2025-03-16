import { useState } from "react";
import { Controller, } from "react-hook-form";

const StatusSection = ({ control, statuses }: StatusProps) => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    function toggleStatus() {
        setIsStatusOpen((prev) => !prev)
    }

    return (
        <div className="flex flex-col">
            <label
                className="text-[14px] font-[500] mb-[2px] text-[#343a40]"
                htmlFor="status"
            >
                სტატუსი*
            </label>

            <Controller
                name="status_id"
                control={control}
                render={({ field: { onChange, value } }) => {
                    const selected = statuses.find((status) => status.id === value);

                    return (
                        <div className="relative w-full cursor-pointer">
                            {/* Trigger */}
                            <div
                                className={`flex justify-between items-center w-[259px] p-[14px] border-[1px] border-[#CED4DA] rounded-[6px] ${isStatusOpen ? "rounded-b-none border-b-0" : ""
                                    } text-[16px] outline-none`}
                                onClick={toggleStatus}
                            >
                                <div className="flex items-center gap-2">
                                    {selected ? (
                                        <span>{selected.name}</span>
                                    ) : (
                                        <span className="text-gray-400">აირჩიე სტატუსი</span>
                                    )}
                                </div>

                                <img
                                    src={
                                        isStatusOpen
                                            ? "/svg/dropUpIcon.svg"
                                            : "/svg/arrow-down.svg"
                                    }
                                    alt="arrow icon"
                                />
                            </div>

                            {/* Dropdown */}
                            {isStatusOpen && (
                                <div
                                    className={`absolute left-0 w-[259px] border-[1px] border-[#CED4DA] rounded-[6px] bg-white shadow-md z-10 ${isStatusOpen ? "rounded-t-none border-t-0" : ""
                                        }`}
                                >
                                    {statuses.length > 0 && (
                                        statuses.map((status) => (
                                            <div
                                                key={status.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onChange(status.id);
                                                    setIsStatusOpen(false);
                                                }}
                                                className="flex items-center gap-2 p-[14px] text-[14px] text-[#0D0F10] hover:bg-gray-100 cursor-pointer"
                                            >
                                                {status.name}
                                            </div>
                                        ))

                                    )}
                                </div>
                            )}
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default StatusSection;
