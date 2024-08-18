export function convertToBase64(image: FileList) {
    console.log(image[0]);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
    });
}
