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
    const watchedValue = watch(fieldName);
    const avatarFile = watchedValue instanceof FileList ? watchedValue[0] : null;

    useEffect(() => {
        const savedPreview = loadStorage(fieldName);
        if (savedPreview) {
            setAvatarPreview(savedPreview);
        }
    }, [fieldName]);



    /// here image tranfrom to base64 format and store in local storage
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
        e.stopPropagation();
        setAvatarPreview(null);
        setValue(fieldName, null);
        removeStorage(fieldName);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    return (
        <div className='col-span-2'>
            <label htmlFor="" className='text-[14px] font-[500] mb-[2px] text-[#343a40]'>{label}</label>
            <div
                onClick={handleDivClick}
                className={`w-full h-[120px] rounded-[8px] border-[1px] border-dashed border-[#CED4DA] flex
                 justify-center items-center ${errors["avatar"] && "border-[#FA4D4D]"} cursor-pointer overflow-hidden`}
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
                            if (avatarPreview) return true;
                            const file = files?.[0];
                            return file ? true : "ფაილი აუცილებელია";
                        },
                        fileSize: (files: FileList) => {
                            const file = files?.[0];
                            if (!file) return true;
                            const maxSizeInBytes = 600 * 1024;
                            return file.size <= maxSizeInBytes;
                        },

                    }

                })}
                ref={(e) => {
                    register(fieldName).ref(e);
                    fileInputRef.current = e;
                }}
                className="hidden"
            />}

        </div>
    );
};

export default AvatarUpload;