import {fileToBase64} from "./fileToBase64";
import {base64ToBlob} from "./base64ToBlob";

/**
 * @description: File to Blob
 * @param  { File } file: File object
 * @return { Promise }
 */
export async function fileToBlob(file: File): Promise<Blob> {
    const r = await fileToBase64(file);
    return base64ToBlob(r);
};