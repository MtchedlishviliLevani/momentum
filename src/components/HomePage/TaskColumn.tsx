import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, color }: TaskColumnProps) => (
    <div className='flex flex-col gap-[30px] '>
        <div style={{ backgroundColor: color }} className='rounded-[10px] py-[15px]'> <h2 className={`text-[20px] font-[500]  text-center text-white`}>
            {status.name}
        </h2>
        </div>
        {tasks.length > 0 && (
            tasks.map((task) => <TaskCard key={task.id} task={task} color={color} />)
        )}

    </div>
);

export default TaskColumn;
