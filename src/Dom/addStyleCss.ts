/**
 * @description 添加css
 * @param {*} styleId 
 * @param {*} arr 
 * @returns 
 */
export function addStyleCss(styleId:string,arr: string[]): CSSStyleSheet | HTMLStyleElement{
    // @ts-ignore
    const targetCss: CSSStyleSheet | undefined = [...document.styleSheets].find((i:CSSStyleSheet)=>i.ownerNode?.id === styleId)
    if(targetCss){
        for (let i=0;i<arr.length;i++) targetCss.insertRule(arr[i])
        return targetCss
    }else{
        const style = document.createElement('style')
        style.id = 'add_style_css_'+Date.now()
        document.body.appendChild(style)
        style.onload = ()=>{
            // @ts-ignore
            const targetCss: CSSStyleSheet | undefined = [...document.styleSheets].find((i:CSSStyleSheet)=>i.ownerNode?.id === style.id)
            // @ts-ignore
            for (let i=0;i<arr.length;i++) targetCss.insertRule(arr[i])
        }
        return style
    }
}