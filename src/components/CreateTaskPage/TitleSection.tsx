import TextInput from "../UI/TextInput";
import ValidationIndicator from "../CreateEmployee/ValidationIndicator";


function TitleSection({ register, watch }: TitleSectionProps) {
    const nameValue = watch("name")?.trim() || "";
    return (
        <>
            <label
                className="text-[14px] font-[500] mb-[2px] text-[#343a40]"
                htmlFor=""
            >
                სათაური*
            </label>

            <TextInput
                name="name"
                register={register}
                validation={{
                    required: "Required",
                    minLength: { value: 3, },
                    maxLength: { value: 255 },

                }}

                isMinLength={nameValue.length >= 3}
                hasValue={nameValue.length}

            />
            <div className="mt-[3px]">
                <ValidationIndicator
                    isValid={nameValue.length >= 3}
                    hasValue={nameValue.length > 0}
                    label="მინიმუმ 3 სიმბოლო"
                />
                <ValidationIndicator
                    isValid={nameValue.length <= 255}
                    hasValue={nameValue.length > 0}
                    label="მაქსიმუმ 255 სიმბოლო"
                />
            </div>
        </>
    );
}

export default TitleSection;