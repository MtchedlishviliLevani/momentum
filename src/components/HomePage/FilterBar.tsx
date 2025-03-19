import { useState, useEffect } from "react";
import Button from "../UI/Button";
import DropDownIcon from "../UI/DropDownIcon";


const FilterBar = ({ title, items, selectedItems, onApply, isOpen, onToggle }: FilterBarProps) => {
    const [tempSelected, setTempSelected] = useState<number[]>([]);

    useEffect(() => {
        if (isOpen) {
            setTempSelected(selectedItems);
        }
    }, [isOpen, selectedItems]);

    function handleCheckboxChange(id: number) {
        if (tempSelected.includes(id)) {
            setTempSelected(tempSelected.filter((itemId) => itemId !== id));
        } else {
            setTempSelected([...tempSelected, id]);
        }
    }

    function handleApply() {
        onApply(tempSelected);
    }

    return (
        <div className="relative inline-block py-[10px] px-[20px] ">
            <button
                onClick={onToggle}
                className={`text-[16px] cursor-pointer ${isOpen ? "text-[#8338EC]" : "text-[#0d0f10]"} flex items-center gap-[8px]`}
            >
                <span> {title}</span> <span className="mr-[12px]"><DropDownIcon currentColor={isOpen ? "#8338EC" : "#0D0F10"} /></span>
            </button>

            {isOpen && (
                <div className="absolute flex flex-col gap-[26.5px]  bg-white rounded-[10px] mt-[22px] z-[5] py-[40px] px-[30px] max-h-[300px] overflow-y-auto  w-[688px] border-solid border-[0.5px] border-[#8338ec]">
                    <div className="grid grid-cols-1  gap-[22px] ">
                        {items.map((item) => (
                            <label key={item.id} className="flex items-center gap-[15px] cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={tempSelected.includes(item.id)}
                                    onChange={() => handleCheckboxChange(item.id)}
                                    className="sr-only peer"
                                />
                                <div className="relative p-[10px] border-[2px] border-[#212529] rounded-[6px] flex items-center justify-center">
                                    <img
                                        className={`w-[14px] text-black absolute ${tempSelected.includes(item.id) ? 'block' : 'hidden'}`}
                                        src="/svg/checkIcon.svg"
                                        alt=""
                                    />
                                </div>
                                {item?.avatar ? <div className="flex items-center gap-[10px]"><img className="w-[28px] h-[28px] rounded-[50%]" src={item?.avatar} alt="" /> <span className="text-[16px] text-[#212529]">{item?.name} {item?.surname}</span> </div> : <span className="text-[16px] text-[#212529]">{item.name}  </span>}
                            </label>
                        ))}
                    </div>
                    <div className="*:w-[155px] *:ml-auto *:py-[6px]">
                        <Button variant="primary" shape="pill" onClick={handleApply} >არჩევა</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;
