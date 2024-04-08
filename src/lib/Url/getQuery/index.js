
// 获取查询参数的函数
const  getQuery = function(link = window.location.href) {
    try {
        const params = {};
        const url = new URL(link);

        // 使用URLSearchParams的forEach方法来遍历所有的键值对
        for (const [key, value] of new URLSearchParams(url.search).entries()) {
          params[decodeURIComponent(key)] = decodeURIComponent(value);
        }

        return params;
    } catch (e) {
        // 如果解析URL出现异常，则调用回退解析函数
        console.error('Error parsing URL:', e);
        try {
            return link.includes('?') ?
                link
                .split('?')[1]
                .split('&')
                .map(param => param.split('='))
                .reduce((params, [key, value]) => {
                    // 对参数进行解码并存入params对象
                    params[decodeURIComponent(key)] = decodeURIComponent(value);
                    return params;
                }, {})
                : {}
        } catch (e) {
            // 如果解析查询字符串出现异常，则返回空对象
            console.error('Error parsing query string:', e);
            return {};
        }
    }
}
export default getQuery