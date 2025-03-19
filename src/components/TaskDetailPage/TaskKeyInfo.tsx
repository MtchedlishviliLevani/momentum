import { getRandomColor } from "../../utils/randomColor"
function TaskKeyInfo({ task }: { task: DetailTask }) {
    return (
        <div className="flex flex-col gap-[26px]">
            <div className="flex flex-col gap-[12px] py-[10px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center  gap-[10px]">
                        <div
                            className={`border p-[4px] ${task.priority.name === "დაბალი"
                                ? "border-[#08A508] text-[#08A508]"
                                : task.priority.name === "საშუალო"
                                    ? "border-[#FFBE0B] text-[#FFBE0B]"
                                    : "border-[#FA4D4D] text-[#FA4D4D]"
                                } flex items-center gap-[4px] rounded-[4px]`}
                        >
                            <img src={task.priority.icon} />{" "}
                            <span className="text-[12px] font-[500]">
                                {task.priority.name}
                            </span>
                        </div>
                        <div
                            style={{ background: getRandomColor() }}
                            className="py-[5px] rounded-[15px] px-[9px]  text-white text-[12px]"
                        >
                            {task.department.name}
                        </div>
                    </div>
                </div>
                <h1 className="text-[34px] font-[600] text-[#212529]">{task.name}</h1>
            </div>
            <p className="text-[18px] leading-[1.5] text-[#000]">{task?.description}</p>
        </div>
    )
}

export default TaskKeyInfo
