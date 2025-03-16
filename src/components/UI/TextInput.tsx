import React from 'react';
const TextInput: React.FC<TextInputProps> = ({
    name,
    type = 'text',
    placeholder = '',
    register,
    validation = {},
    isMinLength = true,
    hasValue,
    className = '',
}) => {

    const errorBorder = !isMinLength && hasValue > 0 && hasValue < 2 ? 'border-[#FA4D4D]' : 'border-[#000]';

    return (
        <input

            type={type}
            placeholder={placeholder}
            className={`w-full  p-[10px]  border-[1px] border-[#CED4DA] text-[#0D0F10]  rounded-[6px] text-[14px]   outline-none  ${errorBorder} ${className}`}
            {...register(name, validation)}
        />
    );
};

export default TextInput;
