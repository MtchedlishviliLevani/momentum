
const ValidationIndicator = ({ isValid, hasValue, label }: ValidationIndicatorProps) => {
    const getValidatedColor = () => {
        if (!hasValue) return '#6C757D';
        if (isValid) return '#08A508';
        return '#FA4D4D';
    };
    return (
        <div className="flex items-center gap-2">
            <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12.3334 1.33325L5.00008 8.66659L1.66675 5.33325"
                    stroke={getValidatedColor()}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span style={{ color: getValidatedColor() }} className="text-[12px] font-firaGo">{label}</span>
        </div>
    );
};

export default ValidationIndicator;