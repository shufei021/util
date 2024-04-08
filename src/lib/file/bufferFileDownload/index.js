/**
 * Buffer下载文件
 * @param {Buffer} buffer
 * @param {String} fileName
 */
const bufferFileDownload = (buffer, fileName) => {
    /* eslint-disable */
    let blob = new Blob([buffer], { type: 'charset=utf-8' })
    let a = document.createElement('a')
    let url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    let body = document.getElementsByTagName('body')[0]
    body.appendChild(a)
    a.click()
    body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }
  
  export default bufferFileDownload
