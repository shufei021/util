# arrayGroup


示例：

```js
 const list = [ 
    {name:'1',type:0}, 
    
    {name:'2',type:1}, 
    {name:'3',type:1}, 
    {name:'4',type:1}, 

    {name:'5',type:0}, 
    {name:'6',type:0}, 

    {name:'7',type:2}, 
    {name:'8',type:2}, 
    {name:'9',type:2}, 

    {name:'10',type:0},
    {name:'11',type:0}, 
  ]
  arrayGroup(list,'type')
    //  需求=> 转换成
  [ 
    
    [{name:'1',type:0}], 

    [{name:'2',type:1}, {name:'3',type:1}, {name:'4',type:1}], 

    [{name:'5',type:0}, {name:'6',type:0}], 

    [{name:'7',type:2}, {name:'8',type:2}, {name:'9',type:2}], 

    [{name:'10',type:0},{name:'11',type:0}], 
  ]
```