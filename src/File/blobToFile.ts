/**
 * @description: Blob  to  File
 * @param  { Blob } blob
 * @param { String } filename : file name
 * @return { File } File
 */
export function blobToFile(blob: Blob, filename: string): File {
    return new File([blob], filename, { type: blob.type, lastModified: Date.now() })
}