



/**
 * @description json数组的 每项键值重组函数
 * @param {*} arr 
 * @param {*} arr1 
 * @returns 
 */
const make =  function(arr, arr1) {
    return arr.reduce((p, c) =>{
      const o =  arr1.reduce((p, [k, v]) => {
            p[c[k]] = c[v]
            return p
        }, {})
       return [...p,{...o}]
    }, [])
}