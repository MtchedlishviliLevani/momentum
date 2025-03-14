import React, { useState, useRef, useEffect } from 'react';
import {
    saveAvatarToStorage,
    loadStorage,
    removeStorage
} from '../../utils/storeInStorage';


const AvatarUpload: React.FC<AvatarUploadProps> = ({
    register,
    setValue,
    watch,
    errors,
    fieldName = 'avatar',
    label = 'ავატარი*'
}) => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    // Fix the typing when accessing the file
    const watchedValue = watch(fieldName);
    const avatarFile = watchedValue instanceof FileList ? watchedValue[0] : null;

    useEffect(() => {
        const savedPreview = loadStorage(fieldName);
        if (savedPreview) {
            setAvatarPreview(savedPreview);
        }
    }, [fieldName]);

    useEffect(() => {
        if (avatarFile && avatarFile instanceof File) {
            saveAvatarToStorage(fieldName, avatarFile)
                .then(dataUrl => {
                    setAvatarPreview(dataUrl);
                })
                .catch(error => {
                    console.error('Error saving avatar:', error);
                });
        }
    }, [avatarFile, fieldName]);

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering file input click
        setAvatarPreview(null);
        setValue(fieldName, null); // Reset form value
        removeStorage(fieldName);

        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset file input manually
        }
    };


    return (
        <div className='col-span-2'>
            <label htmlFor="" className='text-[14px] font-[500] mb-[2px] text-[#343a40]'>{label}</label>
            <div
                onClick={handleDivClick}
                className="w-full h-[120px] rounded-[8px] border-[1px] border-dashed border-[#CED4DA] flex justify-center items-center cursor-pointer overflow-hidden"
            >
                {avatarPreview ? (
                    <div className='relative'>
                        <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="w-[88px] h-[88px] rounded-[100%]"
                        />
                        <img src="svg/trash.svg" onClick={handleDelete} alt="" className='absolute bottom-0 right-0' />
                    </div>
                ) : (
                    <img
                        src="svg/upload-avatar-icon.svg"
                        alt="Upload Icon"
                        className="w-12 h-12"
                    />
                )}
            </div>
            {!avatarPreview && <input
                type="file"
                accept="image/*"
                {...register(fieldName, {
                    required: true,
                    validate: {
                        requiredIfNoPreview: (files: FileList) => {
                            if (avatarPreview) return true; // There's a preview already, so skip "required"
                            const file = files?.[0];
                            return file ? true : "ფაილი აუცილებელია";
                        },
                        fileSize: (files: FileList) => {
                            const file = files?.[0];
                            if (!file) return true; // no file selected
                            const maxSizeInBytes = 600 * 1024;
                            return file.size <= maxSizeInBytes || "ფაილის ზომა უნდა იყოს მაქსიმუმ 600KB";
                        },

                    }

                })}
                ref={(e) => {
                    register(fieldName).ref(e);
                    fileInputRef.current = e;
                }}
                className="hidden"
            />}
            {errors?.[fieldName] && (
                <p className="text-[#FA4D4D] text-sm mt-1">
                    {errors[fieldName].message as string}
                </p>
            )}
        </div>
    );
};

export default AvatarUpload;