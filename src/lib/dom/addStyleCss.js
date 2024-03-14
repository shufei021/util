/**
 * @description 添加css
 * @param {*} styleId 
 * @param {*} arr 
 * @returns 
 */
export default function addStyleCss(styleId,arr){
    const targetCss = [...document.styleSheets].find(i=>i.ownerNode.id === styleId)
    if(targetCss){
        for (let i=0;i<arr.length;i++)targetCss.insertRule(arr[i])
        return targetCss
    }else{
        const style = document.createElement('style')
        style.id = 'add_style_css_'+Date.now()
        document.body.appendChild(style)
        style.onload = ()=>{
            const targetCss = [...document.styleSheets].find(i=>i.ownerNode.id === style.id)
            for (let i=0;i<arr.length;i++)targetCss.insertRule(arr[i])
        }
        return style
    }
}