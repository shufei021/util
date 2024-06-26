/**
 * @description: Blob to Base64
 * @param  {Blob} blob
 * @return {Promise<dataURL>} Base64
 */
type E = { [key: string]: any }

export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
        const reader = new FileReader()
        reader.onload = function (e: E) {
            resolve(e.target.result)
        }
        reader.onerror = function (e: E) {
            reject(e)
        }
        reader.readAsDataURL(blob)
    })
}