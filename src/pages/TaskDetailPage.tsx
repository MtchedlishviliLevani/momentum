import { useLoaderData } from "react-router";
import TaskKeyInfo from "../components/TaskDetailPage/TaskKeyInfo";
import TaskDetail from "../components/TaskDetailPage/TaskDetail";
import CommentSection from "../components/TaskDetailPage/CommentSection";
function TaskDetailPage() {
    const task = useLoaderData() as DetailTask;

    return (
        <div className="grid grid-cols-2 gap-[223px] mt-[40px]">
            <div>
                <TaskKeyInfo task={task} />
                <TaskDetail task={task} />
            </div>
            <CommentSection task={task} />
        </div>
    );
}

export default TaskDetailPage;
