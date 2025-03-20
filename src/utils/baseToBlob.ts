export const base64ToBlob = (base64: string, contentType = "image/jpeg") => {
  const base64String = base64.startsWith("data:")
    ? base64.split(",")[1]
    : base64;
  const byteCharacters = atob(base64String);
  const byteArray = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  return new Blob([byteArray], { type: contentType });
};
