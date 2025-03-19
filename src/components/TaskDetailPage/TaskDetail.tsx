import { useEffect, useState } from "react"
import { formatGeorgianFullDate } from "../../utils/dateFormatter"
import useStatusStore from "../../store/useStatusStore"
import { useTaskStore } from "../../store/useTaskStore";
import { useRevalidator } from "react-router";

function TaskDetail({ task }: { task: DetailTask }) {
    const { statuses, fetchStatuses } = useStatusStore();
    const updateTaskStatus = useTaskStore(state => state.updateTaskStatus);
    const { fetchTasks } = useTaskStore();
    const revalidator = useRevalidator();
    useEffect(() => {
        fetchStatuses();
        fetchTasks();
    }, [fetchStatuses, fetchTasks]);
    const [isStatusDropDownOpen, setIsStatusDropDownOpen] = useState(false);
    const handleStatusChange = async (statusId: number, statusName: string) => {
        try {
            await updateTaskStatus(task?.id, statusId, statusName);
            setIsStatusDropDownOpen(false);
            revalidator.revalidate();
        } catch (error) {
            console.error("Failed to update status:", error)
        }
    }


    return (
        <div className="mt-[73px]">
            <h2 className="text-[24px] text-[#2a2a2a] font-[500]">დავალების დეტალები</h2>
            <div className="flex flex-col gap-[55px] mt-[18px]">
                <div className="flex gap-[70px] items-center">
                    <div className="flex gap-[6px]">
                        <img src="/svg/pie-chart.svg" alt="" />
                        <h3 className="mr-[66px] text-[#474747] text-[16px]">სტატუსი</h3>
                    </div>

                    <>
                        <div className="relative  cursor-pointer  w-[259px]">
                            <div
                                className="flex justify-between items-center w-full p-[14px] border-[1px] border-[#CED4DA] rounded-[6px] text-[16px] outline-none"
                                onClick={() => setIsStatusDropDownOpen((prev) => !prev)} >
                                <span>{task.status.name}</span>
                                <img src="/svg/arrow-down.svg" alt="arrow down" />
                            </div>

                            {isStatusDropDownOpen && (
                                <div
                                    className="absolute left-0 mt-0 w-full border-[1px] border-[#CED4DA] rounded-[6px] bg-white shadow-md z-10"
                                >
                                    {statuses.map((status) => {
                                        return (
                                            <div
                                                onClick={() => handleStatusChange(status.id, status.name)}
                                                key={status.id}
                                                className="p-[14px] text-[14px] text-[#0D0F10] hover:bg-gray-100 cursor-pointer">
                                                {status.name}
                                            </div>

                                        )
                                    })}

                                </div>
                            )}
                        </div>
                    </>

                </div>
                <div className="flex gap-[70px]">
                    <div className="flex gap-[6px] items-center">
                        <img src="/svg/userIcon.svg" alt="" />
                        <h3 className="text-[#474747] text-[16px]">თანამშრომელი</h3>
                    </div>
                    <div className="flex items-center gap-[12px] ml-[7px]">
                        <img className="w-[32px] h-[32px] rounded-[50%]  self-end" src={task.employee.avatar} alt="" />
                        <div className="flex flex-col gap-[1.5px] "><h6 className="text-[#474747] text-[11px]">{task.department.name}</h6><h5 className="text-[#0d0f10] leading-[1.5] text-[14px]">{task.employee.name}</h5></div>
                    </div>
                </div>
                <div className="flex gap-[70px]">
                    <div className="flex gap-[6px]">
                        <img src="/svg/calendar.svg" alt="" />
                        <h3 className="text-[#474747] text-[16px]">დავალების ვადა</h3>
                    </div>
                    <h4 className="text-[#0d0f10] text-[14px] leading-[1.5]"> {formatGeorgianFullDate(task.due_date)}</h4>
                </div>
            </div>
        </div>
    )
}

export default TaskDetail
