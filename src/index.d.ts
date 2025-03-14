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
