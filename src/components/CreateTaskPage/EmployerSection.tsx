import { useState } from 'react';
import { Controller } from 'react-hook-form';
import AddEmploy from './AddEmploy';
import { useOutletContext } from 'react-router';


interface OpenModalFn {
    openModal: () => void
}

function EmployeSection({ control, employees, watch, filteredPeople }: EmployeSectionProps) {
    const { openModal } = useOutletContext<OpenModalFn>()
    const employee_id = watch("employee_id")
    const [isOpenEmployees, setIsEmployeeOpen] = useState(false);


    const toggleDropDown = () => {
        setIsEmployeeOpen(prev => !prev);
    };


    return (
        <>
            <label
                htmlFor=""
                className={`text-[14px] font-[500] mb-[2px] ${employee_id ? "text-[#343a40]" : "text-[#ADB5BD]"
                    } `}
            >
                პასუხისმგებელი თანამშრომელი
            </label>
            <Controller
                control={control}
                name="employee_id"
                rules={{ required: true }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => {

                    const selected = employees.find(
                        (item) => item.id === Number(value)
                    );
                    return (
                        <>
                            <div
                                className="relative w-full cursor-pointer"
                                onClick={toggleDropDown}
                            >
                                <div
                                    className={`${error && "border-[#FA4D4D]"} flex justify-between items-center w-full p-[14px] border-[1px] border-[#CED4DA] rounded-[6px] ${isOpenEmployees ? "rounded-b-none border-b-0" : ""
                                        } text-[16px] outline-none`}
                                >
                                    {selected && (
                                        <div className="flex gap-[10px] items-center">
                                            <img
                                                className="w-[30px] h-[30px] rounded-[50%]"
                                                src={selected?.avatar}
                                                alt=""
                                            />
                                            <span className="text-[#0D0F10]">
                                                {selected?.name} {selected?.surname}
                                            </span>
                                        </div>
                                    )}
                                    <img
                                        className="ml-auto"
                                        src={
                                            isOpenEmployees
                                                ? "/svg/dropUpIcon.svg"
                                                : "/svg/arrow-down.svg"
                                        }
                                        alt="arrow"
                                    />
                                </div>

                                {isOpenEmployees && (
                                    <div className="absolute left-0 w-full border border-[#CED4DA] bg-white z-10 rounded-b-[6px]">
                                        <button onClick={openModal} className='flex items-center gap-[5px] py-[9px] px-[14px]'><AddEmploy /></button>

                                        {filteredPeople.length > 0 && (
                                            filteredPeople.map((person) => (
                                                <div key={person.id} className='px-[14px]'>
                                                    <div
                                                        key={person.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onChange(person.id);
                                                            setIsEmployeeOpen(false);
                                                        }}
                                                        className="flex items-center py-[9px] text-[14px] hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-[5px]">

                                                            <img
                                                                src={person.avatar}
                                                                alt={`${person.name} ${person.surname}`}
                                                                className="w-[28px] h-[28px] rounded-full mr-2"
                                                            />
                                                            <span className="text-[#0D0F10] text-[14px]">

                                                                {person.name} {person.surname}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>))
                                        )}
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

export default EmployeSection;