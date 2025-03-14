import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDepartmentStore } from '../../store/useDepartmentStore';
import Button from '../UI/Button';
import ValidationIndicator from './ValidationIndicator';
import TextInput from '../UI/TextInput';
import AvatarUpload from './AvatarUploader';
import { removeStorage } from '../../utils/storeInStorage';
import { useEmployee } from '../../hooks/useEmployees';

function CreateEmployee({ onCloseModal }: { onCloseModal: () => void }) {
  const departments = useDepartmentStore((state) => state.departments);
  const fetchDepartments = useDepartmentStore((state) => state.fetchDepartments);
  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  const { createEmployee } = useEmployee();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormDataValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      department_id: ""
    }
  });

  const [nameValue, surnameValue, departmentValue] = watch(["name", "surname", "department_id"]);

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedSurname = localStorage.getItem("surname");
    const savedDepartment_id = localStorage.getItem("department_id")
    if (savedName) {
      setValue("name", savedName);
    }
    if (savedSurname) {
      setValue("surname", savedSurname);
    }
    if (savedDepartment_id) {
      setValue("department_id", savedDepartment_id)
    }
  }, [setValue]);


  useEffect(() => {
    localStorage.setItem("name", nameValue);
    localStorage.setItem("surname", surnameValue);
    localStorage.setItem("department_id", departmentValue);
  }, [nameValue, surnameValue, departmentValue]);


  const validateField = (value: string) => ({
    isMinLength: value && value.length >= 2,
    isMaxLength: value && value.length <= 255,
    isValidCharacters: value && /^[A-Za-zა-ჰ\s]+$/.test(value),
  });

  // Validations
  const nameValidation = validateField(nameValue);
  const surnameValidation = validateField(surnameValue);

  // Departments 
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };



  const onSubmit = async (data: FormDataValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('department_id', data.department_id);
    const avatarFile = data.avatar?.[0]; // uploaded in current session

    if (!avatarFile) {
      return alert("ავატარის ატვირთვა აუცილებელია");
    }

    if (avatarFile.size > 600 * 1024) {
      return
    }

    formData.append('avatar', avatarFile);

    try {
      await createEmployee(formData)
      onCloseModal()
      removeStorage("avatar");
      removeStorage("name");
      removeStorage("surname");
      removeStorage("department_id")
      reset();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  };
  return (
    <div className='mt-[37px]'>
      <h2 className='text-center text-[32px] font-[500] text-[#343a40]'>თანამშრომლის დამატება</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid-cols-2 grid gap-[45px] space-y-4 mt-[45px]">
        {/* Name Field */}
        <div className="flex flex-col col-span-1">

          <label htmlFor="name" className="block text-[14px] font-medium mb-[2px] text-[#343a40]">
            სახელი*
          </label>
          <TextInput
            name='name'
            register={register}
            validation={{
              required: true,
              minLength: 2,
              maxLength: 255,
              pattern: /^[A-Za-zა-ჰ\s]+$/,
            }}
            isMinLength={!!nameValidation.isMinLength}
            hasValue={nameValue.length}
          />

          <div className='mt-[3px]'>
            <ValidationIndicator isValid={!!nameValidation.isMinLength}
              hasValue={nameValue.length > 0}
              label='მინიმუმ 2 სიმბოლო' />
            <ValidationIndicator
              isValid={!!nameValidation.isMaxLength}
              hasValue={nameValue.length > 0}
              label="მაქსიმუმ 255 სიმბოლო"
            />
            <ValidationIndicator
              isValid={!!nameValidation.isValidCharacters}
              hasValue={nameValue.length > 0}
              label="მხოლოდ ლათინური და ქართული სიმბოლოები"
            />
          </div>
        </div>
        {/* Surname Field */}
        <div className='flex flex-col col-span-1'>
          <label className='text-[14px] font-[500] mb-[2px] text-[#343a40]' htmlFor="">გვარი*</label>

          <TextInput
            name='surname'
            register={register}
            validation={{
              required: true,
              minLength: 2,
              maxLength: 255,
              pattern: /^[A-Za-zა-ჰ\s]+$/,
            }}
            isMinLength={!!surnameValidation.isMinLength}
            hasValue={surnameValue.length}
          />

          <div className='mt-[3px]'>
            <ValidationIndicator isValid={!!surnameValidation.isMinLength}
              hasValue={surnameValue.length > 0}
              label='მინიმუმ 2 სიმბოლო' />
            <ValidationIndicator
              isValid={!!surnameValidation.isMaxLength}
              hasValue={surnameValue.length > 0}
              label="მაქსიმუმ 255 სიმბოლო"
            />
            <ValidationIndicator
              isValid={!!surnameValidation.isValidCharacters}
              hasValue={surnameValue.length > 0}
              label="მხოლოდ ლათინური და ქართული სიმბოლოები"
            />
          </div>
        </div>

        <AvatarUpload
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        <div className="flex flex-col col-span-1">
          <label className="text-[14px] font-[500] mb-[2px] text-[#343a40]">დეპარტამენტი*</label>

          <Controller
            control={control}
            name="department_id"
            rules={{ required: 'დეპარტამენტის არჩევა სავალდებულოა' }}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <div className="relative w-full cursor-pointer" onClick={toggleDropdown}>
                  <div
                    className={`flex justify-between items-center w-full p-[14px] border-[1px] border-[#CED4DA] rounded-[6px] ${isOpen ? 'rounded-b-none border-b-0' : ''} text-[16px] outline-none`}
                  >
                    <span>{departments.find((d) => d.id === Number(value))?.name || 'აირჩიეთ დეპარტამენტი'}</span>
                    {!isOpen ? (
                      <img src="/svg/arrow-down.svg" alt="arrow down" />
                    ) : (
                      <img src="/svg/dropUpIcon.svg" alt="arrow up" />
                    )}
                  </div>
                  {isOpen && (
                    <div className={`absolute left-0 mt-0 w-full border-[1px] border-[#CED4DA] rounded-[6px] bg-white shadow-md z-10 ${isOpen ? 'rounded-t-none border-t-0' : ''}`}>
                      {departments.map((dept) => (
                        <div
                          key={dept.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            onChange(dept.id)
                            setIsOpen(false)
                          }}
                          className={`p-[14px] text-[14px] text-[#0D0F10] hover:bg-gray-100 cursor-pointer ${Number(value) === dept.id ? 'bg-gray-100' : ''
                            }`}
                        >
                          {dept.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {error && <p className="text-red-500 text-[12px] mt-[4px]">{error.message}</p>}
              </>
            )}
          />
        </div>
        <div className="col-span-2 flex justify-end gap-[22px]">
          <Button variant="outline" shape="default" size='large' onClick={onCloseModal}>გაუქმება</Button>
          <Button variant="primary" shape="default" size='large' type='submit'>დაამატე თანამშრომელი</Button>
        </div> </form >

    </div >
  )
}

export default CreateEmployee








