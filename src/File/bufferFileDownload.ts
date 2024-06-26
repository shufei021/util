/**
 * @description Buffer下载文件
 * @param {Buffer} buffer
 * @param {String} fileName
 */
export function bufferFileDownload(buffer: Buffer, fileName: string) {
    const blob = new Blob([buffer], { type: 'charset=utf-8' })
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(a)
    a.click()
    body.removeChild(a)
    window.URL.revokeObjectURL(url)
}