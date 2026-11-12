function kept(){
  const K=[];S.forEach((s,i)=>{if(s.keep)K.push({i})});
  K.forEach((k,j)=>{
    const s=S[k.i],tn=j<K.length-1?S[K[j+1].i].t:vidDur;
    k.ms=s.dur??Math.max(40,Math.round((tn-s.t)*1000));
  });
  return K;
}

function build(){
  const g=$('grid');g.innerHTML='';sel=-1;$('panel').style.display='none';
  S.forEach((s,i)=>{
    const d=document.createElement('div');d.className='cell';
    const c=document.createElement('canvas');c.width=64;c.height=Math.max(1,Math.round(64*s.c.height/s.c.width));
    c.getContext('2d').drawImage(s.c,0,0,c.width,c.height);
    const sp=document.createElement('span');d.append(c,sp);d.onclick=()=>select(i);g.append(d);
  });
  refresh();
  if(S.length){FW=S[0].c.width;FH=S[0].c.height;$('pv').width=FW;$('pv').height=FH;drawF(0)}
}

function refresh(){
  const K=kept(),cells=$('grid').children,ms={};K.forEach(k=>ms[k.i]=k.ms);
  S.forEach((s,i)=>{
    const c=cells[i];if(!c)return;
    c.classList.toggle('off',!s.keep);c.classList.toggle('sel',i===sel);
    c.lastChild.textContent=s.keep?ms[i]+' ms':'—';
  });
  const tot=K.reduce((a,k)=>a+k.ms,0);
  $('inf').textContent=K.length?K.length+' de '+S.length+' frames · '+(tot/1000).toFixed(1)+' s · promedio '+(K.length/(tot/1000)).toFixed(1)+' fps':'Sin frames';
  ['pl','ex1','ex2'].forEach(id=>$(id).disabled=!K.length);
  if(sel>=0)panel();
}

function select(i){
  sel=i;$('panel').style.display='block';
  if(!playing)drawF(i);
  refresh();
}
function panel(){
  const s=S[sel],K=kept(),k=K.find(x=>x.i===sel);
  $('pi').textContent='Frame '+(sel+1)+' · '+s.t.toFixed(2)+' s · movimiento '+s.m.toFixed(1)+(s.keep?'':' · (quitado)');
  $('du').disabled=!s.keep;$('ap').disabled=!s.keep;
  if(document.activeElement!==$('du'))$('du').value=s.dur??'';
  $('du').placeholder=k?k.ms+' (auto)':'';
}
$('tg').onclick=()=>{if(sel<0)return;const s=S[sel];s.keep=!s.keep;if(!s.keep)s.dur=null;refresh()};
$('ap').onclick=()=>{if(sel<0)return;const v=parseInt($('du').value);S[sel].dur=isNaN(v)?null:Math.max(40,v);$('du').blur();refresh()};

