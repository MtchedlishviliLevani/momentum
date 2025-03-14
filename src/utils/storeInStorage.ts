export const saveAvatarToStorage = (
  fieldName: string,
  file: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error("Invalid file object"));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem(`${fieldName}`, dataUrl);
      resolve(dataUrl);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

export const loadStorage = (fieldName: string): string | null => {
  return localStorage.getItem(`${fieldName}`);
};

export const removeStorage = (fieldName: string): void => {
  localStorage.removeItem(`${fieldName}`);
};
