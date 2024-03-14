
/**
 * 光标位置 设置 和 获取
 */
export default function cursor(input,pos){
    input = typeof input === 'string' ? document.querySelector(input): input
    if(pos===undefined){
        return input.selectionStart
    } else {
        input.focus()
        const p =pos==='first'?0:pos==='last'? input.value.length : Number(pos)
        if (typeof input.selectionStart == 'number' && typeof input.selectionEnd == 'number') {
            input.selectionStart = input.selectionEnd = p;/*平时所见的光标其实是由两部分组成的，即selectionStart和selectionEnd，一般时候这两个是想等的，但在选中一段文字，全选时，他们的差值就是所选文字的个数。*/
        }
    }
}