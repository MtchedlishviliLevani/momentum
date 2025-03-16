import { useState } from 'react';
import { Controller } from 'react-hook-form';


function PrioritySection({ control, priorities }: PrioritySectionProps) {
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);

    const toggleDropDown = () => {
        setIsPriorityOpen((prev) => !prev);
    };

    return (
        <>
            <label className="text-[14px] font-[500] mb-[2px] text-[#343a40]">
                პრიორიტეტი*
            </label>

            <Controller
                name="priority_id"
                control={control}
                rules={{ required: "პრიორიტეტის არჩევა სავალდებულოა" }}
                render={({
                    field: { onChange, value },

                }) => {
                    const selected = priorities.find((p) => p.id === value);

                    return (
                        <div className="relative w-full cursor-pointer">
                            <div
                                className={`flex w-[259px] justify-between items-center p-[14px] border-[1px] border-[#CED4DA] rounded-[6px] ${isPriorityOpen ? "rounded-b-none border-b-0" : ""
                                    } text-[16px] outline-none`}
                                onClick={toggleDropDown}
                            >
                                <div className="flex items-center gap-2">
                                    {selected ? (
                                        <div className="flex gap-[8px] items-center">
                                            <img
                                                src={selected.icon}
                                                alt={selected.name}
                                                className="w-5 h-5"
                                            />
                                            <span>{selected.name}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">აირჩიე პრიორიტეტი</span>
                                    )}
                                </div>

                                <img
                                    src={
                                        isPriorityOpen
                                            ? "/svg/dropUpIcon.svg"
                                            : "/svg/arrow-down.svg"
                                    }
                                    alt="arrow icon"
                                />
                            </div>

                            {isPriorityOpen && (
                                <div
                                    className={`absolute w-[259px] left-0 mt-0 border-[1px] border-[#CED4DA] rounded-[6px] bg-white shadow-md z-10 ${isPriorityOpen ? "rounded-t-none border-t-0" : ""
                                        }`}
                                >
                                    {priorities.length > 0 ? (
                                        priorities.map((priority) => (
                                            <div
                                                key={priority.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onChange(priority.id);
                                                    setIsPriorityOpen(false);
                                                }}
                                                className="flex items-center gap-2 p-[14px] text-[14px] text-[#0D0F10] hover:bg-gray-100 cursor-pointer"
                                            >
                                                <img
                                                    src={priority.icon}
                                                    alt={priority.name}
                                                    className="w-5 h-5"
                                                />
                                                {priority.name}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-[14px] text-[14px] text-gray-500">
                                            პრიორიტეტები ვერ მოიძებნა
                                        </div>
                                    )}
                                </div>
                            )}


                        </div>
                    );
                }}
            />
        </>
    );
}

export default PrioritySection;
