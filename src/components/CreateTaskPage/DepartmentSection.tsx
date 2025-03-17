import { useState } from "react";
import { Controller } from "react-hook-form";

function DepartmentSection({ control, departments, setValue }: DepartmentSelectorProps) {
    const [isOpenDepartment, setIsOpenDepartment] = useState(false);

    const toggleDropDown = () => {
        setIsOpenDepartment(prev => !prev);
    };

    return (
        <>
            <label className="text-[14px] font-[500] mb-[2px] text-[#343a40]">
                დეპარტამენტი*
            </label>

            <Controller
                control={control}
                name="department_id"
                rules={{ required: "დეპარტამენტის არჩევა სავალდებულოა" }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },

                }) => {
                    const selected = departments.find(
                        (p) => p.id === Number(value)
                    );
                    return (
                        <>
                            <div
                                className="relative w-full cursor-pointer"
                                onClick={toggleDropDown}
                            >
                                <div
                                    className={`flex justify-between items-center w-full p-[14px] border-[1px] border-[#CED4DA] rounded-[6px] ${isOpenDepartment ? "rounded-b-none border-b-0" : ""} text-[16px] outline-none`}
                                >
                                    <span>{selected?.name}</span>
                                    {!isOpenDepartment ? (
                                        <img src="/svg/arrow-down.svg" alt="arrow down" />
                                    ) : (
                                        <img src="/svg/dropUpIcon.svg" alt="arrow up" />
                                    )}
                                </div>
                                {isOpenDepartment && (
                                    <div
                                        className={`absolute left-0 mt-0 w-full border-[1px] border-[#CED4DA] rounded-[6px] bg-white shadow-md z-10 ${isOpenDepartment ? "rounded-t-none border-t-0" : ""}`}
                                    >
                                        {departments.map((dept) => (
                                            <div
                                                key={dept.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onChange(dept.id);
                                                    setIsOpenDepartment(false);
                                                    setValue("employee_id", null);
                                                }}
                                                className={`p-[14px] text-[14px] text-[#0D0F10] hover:bg-gray-100 cursor-pointer ${Number(value) === dept.id ? "bg-gray-100" : ""}`}
                                            >
                                                {dept.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {error && (
                                <p className="text-red-500 text-[12px] mt-[4px]">
                                    {error.message}
                                </p>
                            )}
                        </>
                    );
                }}
            />
        </>
    );
}

export default DepartmentSection;