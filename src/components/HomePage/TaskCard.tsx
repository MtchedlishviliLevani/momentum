import { Link } from "react-router";
import { formatGeorgianDate } from "../../utils/dateFormatter";

type TaskCardProps = {
    task: Task;
    color: string;
};
import { getRandomColor } from "../../utils/randomColor";
const TaskCard = ({ task, color }: TaskCardProps) => {

    return (
        <Link to={String(`task/${task.id}`)}>
            <div style={{ borderColor: color }} className="border p-[20px]  rounded-[15px]  bg-white flex flex-col gap-[29px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center  gap-[10px]">
                        <div className={`border p-[4px] ${task.priority.name === "დაბალი" ? "border-[#08A508] text-[#08A508]" : task.priority.name === "საშუალო" ? "border-[#FFBE0B] text-[#FFBE0B]" : "border-[#FA4D4D] text-[#FA4D4D]"} flex items-center gap-[4px] rounded-[4px]`}><img src={task.priority.icon} /> <span className="text-[12px] font-[500]">{task.priority.name}</span></div>
                        <div style={{ background: getRandomColor() }} className="py-[5px] rounded-[15px] px-[9px]  text-white text-[12px]">{task.department.name.slice(0, 17)}</div>
                    </div>
                    <h4 className="text-[12px] text-[#212529]">{formatGeorgianDate(task.due_date)}</h4>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <h2 className="text-[#212529] font-[500]">{task.name}</h2>
                    <p className="text-[#343a40] text-[14px]">{task.description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <img className="w-[31px] h-[31px] rounded-[50%]" src={task.employee.avatar} />
                    <div className="flex items-center gap-[5px]">
                        <img src="/svg/Comments.svg" alt="" />
                        <span>{task.total_comments}</span>
                    </div>
                </div>

            </div>
        </Link>
    )
};

export default TaskCard;
