import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ValidationIndicator from "../CreateEmployee/ValidationIndicator";



interface DescriptionSectionProps {
    register: UseFormRegister<UseFormValues>;
    watch: UseFormWatch<UseFormValues>;
    errors: FieldErrors<UseFormValues>;
}
function DescriptionSection({ register, watch, errors }: DescriptionSectionProps) {
    const descriptionValue = watch("description")?.trim() || ""
    return (
        <>
            <label
                htmlFor=""
                className="block text-[14px] font-[500] mb-[2px] text-[#343a40]"
            >
                აღწერა
            </label>
            <textarea
                id="description"
                rows={4}
                className={`border w-[100%] outline-none text-[14px] leading-[150%] text-[#0D0F10] rounded-[5px] p-[14px] resize-none ${errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                {...register("description", {
                    validate: (value) => {
                        if (!value) return true;
                    },
                })}
            />
            {descriptionValue.length > 0 &&
                <div className="mt-[3px]">
                    <ValidationIndicator
                        isValid={descriptionValue.trim().split(/\s+/).filter(Boolean).length >= 4}
                        hasValue={descriptionValue.length > 0}
                        label="მინიმუმ 4 სიმბოლო"
                    />
                    <ValidationIndicator
                        isValid={descriptionValue.length <= 255}
                        hasValue={descriptionValue.length > 0}
                        label="მაქსიმუმ 255 სიმბოლო"
                    />
                </div>
            }
        </>
    )
}

export default DescriptionSection
