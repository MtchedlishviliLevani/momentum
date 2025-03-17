// types file

interface ModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
}

/// Button component
type Size = "default" | "large";
type Variant = "primary" | "outline";
type Shape = "default" | "pill";
type Padding = "default" | "compact";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  shape?: Shape;
  padding?: Padding;
  size?: Size; // new
  children: React.ReactNode;
}

///ValidationIndicator
interface ValidationIndicatorProps {
  isValid: boolean | undefined;
  hasValue: boolean;
  label: string;
}

//// Avatar uploader
// You can define this type based on your actual form structure
type FormValueType =
  | string
  | number
  | boolean
  | FileList
  | File
  | null
  | undefined;

// Form values interface
interface FormValues {
  [key: string]: FormValueType;
}

interface AvatarUploadProps {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<UseFormValues>;
  fieldName?: string;
  label?: string;
}

/// TextInput

type TextInputProps = {
  name?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FormValues>; // react-hook-form register function
  validation?: object; // validation rules for register
  isMinLength?: boolean; // for custom validation logic (like nameValidation.isMinLength)
  hasValue: number;
  className?: string;
};

/// CreateEmployee

interface FormValues {
  name: string;
  surname: string;
  department_id: number;
  avatar: FileList;
}

interface FormDataValues {
  name: string;
  surname: string;
  department_id: string;
  avatar?: FileList;
}

/// create-task-page

interface UseFormValues {
  name: string;
  description: string;
  status_id: number;
  employee_id: number | null;
  priority_id: number | null;
  department_id: number;
  due_date: string;
}

/// EmploySection
interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
}

interface EmployeSectionProps {
  control: Control<UseFormValues>;
  employees: Employee[];
  filteredPeople: Employee[];
  watch: UseFormWatch<UseFormValues>;
}

//// Prioritety Section
interface Priority {
  id: number;
  name: string;
  icon: string;
}
interface PrioritySectionProps {
  control: Control<UseFormValues>;
  priorities: Priority[];
  setValue: UseFormSetValue<UseFormValues>;
}

/// StatusSection
type Status = {
  id: number;
  name: string;
};

interface StatusProps {
  control: Control<UseFormValues>;
  statuses: Status[];
}

//// Department section
interface Department {
  id: number;
  name: string;
}
interface DepartmentSelectorProps {
  control: Control<UseFormValues>;
  departments: Department[];
  setValue: UseFormSetValue<UseFormValues>;
}

// Title Section
interface TitleSectionProps {
  register: UseFormRegister<UseFormValues>;
  watch: UseFormWatch<UseFormValues>;
}

/// Description
interface DescriptionSectionProps {
  register: UseFormRegister<UseFormValues>;
  watch: UseFormWatch<UseFormValues>;
  errors: FieldErrors<UseFormValues>;
}

/// home
type Department = {
  id: number;
  name: string;
};

type Priority = {
  id: number;
  name: string;
  icon: string;
};

type Status = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
};

type Task = {
  id: number;
  name: string;
  description: string;
  due_date: string; // or Date if you plan to convert it
  department: Department;
  employee: Employee;
  priority: Priority;
  status: Status;
  total_comments: number;
};

/// Homepage
interface SelectedFiltersType {
  departments: number[];
  priorities: number[];
  employees: number[];
}

/// filterBar
type Item = {
  id: number;
  name: string;
  surname?: string;
};

type FilterBarProps = {
  title: string;
  items: Item[];
  selectedItems: number[];
  onApply: (selected: number[]) => void;
};

//// Selected filters
type FilterType = "departments" | "priorities" | "employees";

type Department = { id: number; name: string };
type Priority = { id: number; name: string };
type Employee = { id: number; name: string; surname?: string };

type SelectedFiltersProps = {
  selectedFilters: Record<FilterType, number[]>;
  departments: Department[];
  priorities: Priority[];
  employees: Employee[];
  removeSelectedFilter: (type: FilterType, id: number) => void;
  clearSelectedFilter: () => void;
};

// TaskColumn Comp
type TaskColumnProps = {
  status: Status;
  tasks: Task[];
  color: string;
};
