/**
 * @description: File to Base64
 * @param { File } file :  File
 * @return { Promise }
 */
export function fileToBase64(file:File): Promise<any> {
    return new Promise((resole:Function) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            resole(this.result)
        }
    })
}