/**
 * @description: Base64 to File
 * @param  {String}  base64
 * @param  {String}  fileName
 * @return {File}
 */
export function base64ToFile(base64: string, fileName: string): File {
    let arr:any[] = base64.split(','),
        mimeType = arr[0].match(/:(.*?);/)[1], //base64文件类型
        bStr = atob(arr[1]),
        n = bStr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bStr.charCodeAt(n)
    }
    return new File([u8arr], fileName, { type: mimeType })
}