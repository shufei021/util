/**
 * @description: base64数据导出文件下载
 * @param {string} filename - 下载时的文件名
 * @param {dataURL} base64 - base64字符串
 */


interface A extends Element {
    [key: string]: any
}

export function downloadByBase64(base64: string, filename: string = 'default') {
    const a: A = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)
    a.download = filename
    a.href = base64
    if (document.createEvent) {
        const downloadEvt = document.createEvent('MouseEvents')
        downloadEvt.initEvent('click', true, false)
        a.dispatchEvent(downloadEvt)
    } else if ((document as any).createEventObject) {
        a.fireEvent('onclick')
    } else if (typeof a.onclick == 'function') {
        a.onclick()
    }
    document.body.removeChild(a)
}