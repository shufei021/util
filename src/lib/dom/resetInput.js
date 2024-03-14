/**
 * @description 解决软键盘遮挡输入框问题
 *
 */

const resetInput = function (input) {
    // 当前获取焦点的元素
    const inputElement =typeof input ==='string'? document.querySelector(input):input || document.activeElement;
    // 如果当前获取焦点元素是 输入框 或是 文本框
    if (inputElement.tagName === "INPUT" || inputElement.tagName === "TEXTAREA") {
        const ua = navigator.userAgent;
        const scrollType = /iPad|iPhone|iPod/.test(ua)? ua.includes("Safari/") || /OS 11_[0-3]\D/.test(ua) ? 0: 1 : 2;
        let scrollTimer;

        const scrollIntoView = () => {
            if (scrollType === 0) return;
            if (scrollType === 1) {
                document.body.scrollTop = document.body.scrollHeight;
            } else {
                inputElement.scrollIntoView(false);
            }
        };

        inputElement.addEventListener("focus", () => {
            setTimeout(scrollIntoView, 300);
            scrollTimer = setTimeout(scrollIntoView, 1000);
        });

        inputElement.addEventListener("blur", () => {
            clearTimeout(scrollTimer);

            // 某些情况下收起键盘后输入框不收回，页面下面空白
            // 比如：闲鱼、大麦、乐动力、微信
            if (scrollType && /iPad|iPhone|iPod/.test(ua)) {
                // 以免点击快捷短语无效
                setTimeout(() => {
                    document.body.scrollIntoView();
                });
            }
        });
    }
};
export default resetInput;
//window.addEventListener('resize', resetInput)