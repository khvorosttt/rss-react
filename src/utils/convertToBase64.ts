export function convertToBase64(image: FileList) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
    });
}
