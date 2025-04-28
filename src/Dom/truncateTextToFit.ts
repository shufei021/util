/**
 * 
 * @param element 要计算宽度的文本元素
 * @param maxWidth 最大宽度
 * @param maxLines 超出的行数就省略
 * @param fontSize 字体大小
 * @returns 合适的文本 + ...
 */

export function truncateTextToFit(element: Element, maxWidth: number, maxLines: number, fontSize: number) {
    const text = element.textContent || (element as HTMLElement).innerText;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // 设置字体大小
    const fontStyle = window.getComputedStyle(element).font;
    context!.font = fontStyle.replace(/\d+px/, `${fontSize}px`);

    let truncatedText = '';
    let currentLine = '';
    let lineCount = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const testLine = currentLine + char;
        const metrics = context!.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth) {
            lineCount++;
            if (lineCount >= maxLines) {
                truncatedText += currentLine.trim() + '...';
                break;
            } else {
                truncatedText += currentLine.trim() + '';
                currentLine = char;
            }
        } else {
            currentLine = testLine;
        }
    }

    if (lineCount < maxLines) {
        truncatedText += currentLine;
    }

    return truncatedText;
}