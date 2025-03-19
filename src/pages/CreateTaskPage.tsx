import { useForm, Controller } from "react-hook-form";
import { useDepartmentStore } from "../store/useDepartmentStore";
import { useEffect } from "react";
import { useEmployee } from "../hooks/useEmployees";
import { usePriorityStore } from "../store/usePrioritetyStore";
import useStatusStore from "../store/useStatusStore";
import DateTimePicker from "../components/CreateTaskPage/DateTimePicker";
import Button from "../components/UI/Button";
import { getTomorrowDateFormatted } from "../utils/getTommorowDate";
import TitleSection from "../components/CreateTaskPage/TitleSection";
import DescriptionSection from "../components/CreateTaskPage/DescriptionSection";
import DepartmentSection from "../components/CreateTaskPage/DepartmentSection";
import EmployeSection from "../components/CreateTaskPage/EmployerSection";
import PrioritySection from "../components/CreateTaskPage/PrioritetySection";
import StatusSection from "../components/CreateTaskPage/StatusSection";
import { useTaskStore } from "../store/useTaskStore";
import { useNavigate } from "react-router";

function CreateTaskPage() {
    const { priorities, fetchPriorities } = usePriorityStore();

    useEffect(() => {
        fetchPriorities();
    }, [fetchPriorities]);

    const savedFormData = localStorage.getItem("create-task-values");
    const parsedSavedFormData: Partial<UseFormValues> = savedFormData ? JSON.parse(savedFormData) : {};
    const {
        register,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<UseFormValues>({
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            employee_id: undefined,
            priority_id: 2,
            status_id: 1,
            due_date: getTomorrowDateFormatted(),
            ...parsedSavedFormData
        },
    });
    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem("create-task-values", JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const selectedDepartmentId = watch("department_id");
    /// departments
    const departments = useDepartmentStore((state) => state.departments);
    const fetchDepartments = useDepartmentStore(
        (state) => state.fetchDepartments
    );

    const { employees, fetchEmployees } = useEmployee();
    useEffect(() => {
        fetchDepartments()
        fetchEmployees();
    }, [fetchEmployees, fetchDepartments]);

    const filteredPeople = employees.filter(
        (person) => person?.department?.id === Number(selectedDepartmentId)
    );


    //// STATUS
    const { statuses, fetchStatuses } = useStatusStore();

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    /// navigation
    const navigate = useNavigate()

    const addTask = useTaskStore((state) => state.addTask);

    const onSubmit = async (data: UseFormValues) => {

        try {

            const [day, month, year] = data.due_date.split("/");

            const formattedDate = `${year}-${month}-${day}`;

            const payload = {
                ...data,
                due_date: formattedDate,
            };

            await addTask(payload);
            localStorage.removeItem("create-task-values");
            reset();
            navigate("/")

            console.log(payload)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-[34px] font-[600] text-[#212529] mt-[40px] mb-[30px]">
                შექმენი ახალი დავალება
            </h1>
            <div className="rounded-[4px] border-solid border-[0.3px] border-[#ddd2ff] bg-[#FDFBFF]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-x-[161px] gap-y-[55px] py-[63px] pl-[55px] pr-[368px]"
                >
                    <div className="flex flex-col col-span-1">
                        <TitleSection register={register} watch={watch} />
                    </div>
                    <div className="flex flex-col col-span-1">
                        <DepartmentSection control={control}
                            departments={departments}
                            setValue={setValue} />
                    </div>
                    <div>
                        <DescriptionSection register={register} watch={watch} errors={errors} />
                    </div>
                    <div>
                        <EmployeSection control={control} employees={employees} watch={watch} filteredPeople={filteredPeople} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col col-span-1">
                            <PrioritySection control={control}
                                priorities={priorities}
                                setValue={setValue} />
                        </div>
                        <div className="w-[259px]">
                            <StatusSection control={control} statuses={statuses} />
                        </div>
                    </div>
                    <Controller
                        name="due_date"
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                            validate: (value) => {
                                const [dayStr, monthStr, yearStr] = value.split("/");
                                const day = parseInt(dayStr, 10);
                                const month = parseInt(monthStr, 10);
                                const year = parseInt(yearStr, 10);

                                if (month < 1 || month > 12) {
                                    return "Invalid month.";
                                }
                                const daysInMonth = new Date(year, month, 0).getDate();
                                if (day < 1 || day > daysInMonth) {
                                    return `Invalid day. ${month}/${year} only has ${daysInMonth} days.`;
                                }
                                const selectedDate = new Date(year, month - 1, day);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                selectedDate.setHours(0, 0, 0, 0);

                                if (selectedDate < today) {
                                    return "Date must be today pr future";
                                }
                                return true;
                            }
                        }}

                        render={({ field: { onChange, value } }) => (
                            <div className="w-[50%]">

                                <DateTimePicker value={value} onChange={onChange} />
                            </div>
                        )}

                    />
                    <div className="col-span-2 ml-auto">
                        <Button variant="primary" shape="default" type="submit">
                            დავალების შექმნა
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTaskPage;
