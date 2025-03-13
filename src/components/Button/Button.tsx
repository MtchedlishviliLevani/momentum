

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    shape = 'default',
    padding = 'default',
    size = 'default',
    children,
    onClick,
    ...props
}) => {
    const base = 'flex items-center justify-center gap-[4px] transition-all duration-300 cursor-pointer';

    const variants: Record<Variant, string> = {
        primary: 'bg-purple-600 text-white hover:bg-[#B588F4]',
        outline: 'bg-white text-[#212529] border border-purple-600 hover:border-[#B588F4]',
    };
    const sizes: Record<Size, string> = {
        default: 'text-[16px]',
        large: 'text-[18px]',
    };
    const shapes: Record<Shape, string> = {
        default: 'rounded-[5px]',
        pill: 'rounded-[20px]',
    };

    const paddings: Record<Padding, string> = {
        default: 'py-[10.5px] px-[20px]',
        compact: 'py-[8px] px-[18.5px]',
    };

    const classes = `${base} ${variants[variant]} ${shapes[shape]} ${paddings[padding]} ${sizes[size]}`;

    return (
        <button onClick={onClick} className={`${classes} ${props.className || ''}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
