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
