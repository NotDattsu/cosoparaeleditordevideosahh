const $=id=>document.getElementById(id);
let S=[],vfile=null,vidDur=0,sel=-1,playing=false,pi=0,timer=null,FW=0,FH=0;
const msg=t=>{$('msg').textContent=t};
[['gap','l1'],['maxF','l2'],['sens','l3'],['curve','l4']].forEach(([a,b])=>$(a).oninput=()=>$(b).textContent=$(a).value);

