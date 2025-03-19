import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import useStatusStore from "../store/useStatusStore";
import { useDepartmentStore } from "../store/useDepartmentStore";
import { useEmployeeStore } from "../store/useEmployeeStore"; // Assuming this exists
import { usePriorityStore } from "../store/usePrioritetyStore"; // Assuming this exists
import FilterBar from "../components/HomePage/FilterBar";
import TaskColumn from "../components/HomePage/TaskColumn";
import SelectedFilters from "../components/HomePage/SelectedFilters";

const statusColors: { [key: number]: string } = {
    1: "#F7BC30",
    2: "#FB5607",
    3: "#FF006E",
    4: "#3A86FF",
};


function Home() {
    const { tasks, fetchTasks } = useTaskStore();
    const { statuses, fetchStatuses } = useStatusStore();
    const { departments, fetchDepartments } = useDepartmentStore();
    const { employees, fetchEmployees } = useEmployeeStore();
    const { priorities, fetchPriorities } = usePriorityStore();
    const [activeFilterBar, setActiveFilterBar] = useState<string | null>(null);

    const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>(() => {
        const storedFilters = localStorage.getItem('selectedFilters');
        return storedFilters ? JSON.parse(storedFilters) : {
            departments: [],
            priorities: [],
            employees: []
        };
    });
    useEffect(() => {
        const storedFilters = localStorage.getItem('selectedFilters');
        if (storedFilters) {
            setSelectedFilters(JSON.parse(storedFilters));
        }
    }, []);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);


    useEffect(() => {


        fetchStatuses();
        fetchTasks();
        fetchDepartments();
        fetchEmployees();
        fetchPriorities();
    }, [fetchStatuses, fetchTasks, fetchDepartments, fetchEmployees, fetchPriorities]);

    // Filter logic: combine all active filters
    useEffect(() => {
        let updatedTasks = [...tasks];

        if (selectedFilters.departments.length > 0) {
            updatedTasks = updatedTasks.filter((task) =>
                selectedFilters.departments.includes(task.department.id)
            );
        }

        if (selectedFilters.priorities.length > 0) {
            updatedTasks = updatedTasks.filter((task) =>
                selectedFilters.priorities.includes(task.priority.id)
            );
        }

        if (selectedFilters.employees.length > 0) {
            updatedTasks = updatedTasks.filter((task) =>
                selectedFilters.employees.includes(task.employee.id)
            );
        }

        setFilteredTasks(updatedTasks);

        localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    }, [selectedFilters, tasks]);

    function removeSelectedFilter(type: keyof typeof selectedFilters, id: number) {
        setSelectedFilters((prev) => ({
            ...prev,
            [type]: prev[type].filter((itemId) => itemId !== id),
        }));
    }
    function clearSelectedFilter() {
        setSelectedFilters({
            departments: [],
            priorities: [],
            employees: []
        })
    }
    return (
        <div>
            <h1 className="text-[34px] font-[600] text-[#212529] mt-[40px] mb-[30px]">
                დავალების გვერდი
            </h1>
            <div className=" grid grid-cols-3 border-[#dee2e6] border-solid border-[1px] rounded-[10px] max-w-[688px] gap-[45px]">
                <FilterBar
                    title="დეპარტამენტი"
                    items={departments}
                    selectedItems={selectedFilters.departments}
                    onApply={(selected) => {
                        setSelectedFilters(prev => ({ ...prev, departments: selected }));
                        setActiveFilterBar(null);
                    }}
                    isOpen={activeFilterBar === 'დეპარტამენტი'}
                    onToggle={() => setActiveFilterBar(prev =>
                        prev === 'დეპარტამენტი' ? null : 'დეპარტამენტი'
                    )}

                />

                <FilterBar
                    title="პრიორიტეტი"
                    items={priorities}
                    selectedItems={selectedFilters.priorities}
                    onApply={(selected) => {
                        setSelectedFilters(prev => ({ ...prev, priorities: selected }));
                        setActiveFilterBar(null);
                    }}
                    isOpen={activeFilterBar === 'პრიორიტეტი'}
                    onToggle={() => setActiveFilterBar(prev =>
                        prev === 'პრიორიტეტი' ? null : 'პრიორიტეტი'
                    )} />

                <FilterBar
                    title="თანამშრომელი"
                    items={employees}
                    selectedItems={selectedFilters.employees}
                    onApply={(selected) => {
                        setSelectedFilters(prev => ({ ...prev, employees: selected }));
                        setActiveFilterBar(null);
                    }}
                    isOpen={activeFilterBar === 'თანამშრომელი'}
                    onToggle={() => setActiveFilterBar(prev =>
                        prev === 'თანამშრომელი' ? null : 'თანამშრომელი'
                    )} />
            </div>
            <SelectedFilters
                selectedFilters={selectedFilters}
                departments={departments}
                priorities={priorities}
                employees={employees}
                removeSelectedFilter={removeSelectedFilter}
                clearSelectedFilter={clearSelectedFilter}
            />
            <div className="grid grid-cols-4 gap-[52px] mt-[25px]">
                {statuses.map((status) => {
                    const tasksForStatus = filteredTasks.filter(
                        (task) => task.status.id === status.id
                    );

                    return (
                        <TaskColumn
                            key={status.id}
                            status={status}
                            tasks={tasksForStatus}
                            color={statusColors[status.id]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
