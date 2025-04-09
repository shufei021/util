/**
 * @description 解析URL中的查询参数，并返回一个包含所有参数的对象。
 * @param { string } link 
 * @return {object}
 */

export function getQuery(link: string = window.location.href):object {
    try {
        const params:{[key: string]: string} = {};
        const map = Object.fromEntries(new URLSearchParams(window.location.search).entries())
        for (const key in map) {
            params[key] = decodeURIComponent(map[key]);
        }
        return params;
    } catch (e) {
        try {
            return link.includes('?') ?
                link
                    .split('?')[1]
                    .split('&')
                    .map(param => param.split('='))
                    .reduce((params:{[key: string]: string}, [key, value]:string[]) => {
                        // 对参数进行解码并存入params对象
                        params[decodeURIComponent(key)] = decodeURIComponent(value);
                        return params;
                    }, {})
                : {}
        } catch (e) {
            // 如果解析查询字符串出现异常，则返回空对象
            return {};
        }
    }
}