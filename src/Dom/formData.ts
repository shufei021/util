/**
 *  @description JSON 转 FormData 对象
 *  @param { Object } o 需要转成formData 的对象
 *  @return { FormData }
 */
export function formData(o: {[key: string]: any}): FormData{
  return Object.keys(o).reduce((p: FormData, c: string) => {
    p.append(c, o[c])
    return p
  }, new FormData())
}
