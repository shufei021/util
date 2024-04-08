import fileToBase64 from "../fileToBase64/index.js";
import base64ToBlob from "../base64ToBlob/index.js";

/**
 * @description: File to Blob
 * @param  { File } file: File object
 * @return { Promise }
 */
const fileToBlob = function (file) {
    return fileToBase64(file).then((r) => base64ToBlob(r));
};
export default fileToBlob;