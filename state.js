if(!document.getElementById('gap')||!document.getElementById('curve')){document.body.insertAdjacentHTML('afterbegin','<p style="background:#c0392b;color:#fff;padding:10px;border-radius:8px">El index.html que se esta mostrando es una version vieja (cache o archivo sin reemplazar). Recarga sin cache o vuelve a subir index.html.</p>')}
const $=id=>document.getElementById(id);
let S=[],vfile=null,vidDur=0,sel=-1,playing=false,pi=0,timer=null,FW=0,FH=0;
const msg=t=>{$('msg').textContent=t};
[['gap','l1'],['maxF','l2'],['sens','l3'],['curve','l4']].forEach(([a,b])=>$(a).oninput=()=>$(b).textContent=$(a).value);

