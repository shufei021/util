/**
 * @description 设置元素里面文字呈选中状态
 * @param {Element | String} element 
 */
export function selectTextByElement(element:string | Element | HTMLElement):void {
    const text = typeof element === 'string' ?  document.querySelector(element) : element;
    // @ts-ignore
    if (document.body.createTextRange) {
        // @ts-ignore
      const range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      // @ts-ignore
      range.selectNodeContents(text);
      // @ts-ignore
      selection.removeAllRanges();
      // @ts-ignore
      selection.addRange(range);
    }
  }