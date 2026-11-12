$('vf').onchange=e=>{vfile=e.target.files[0];if(!vfile)return;$('vn').textContent=vfile.name;$('an').disabled=false;msg('')};

const seek=(v,t)=>new Promise(r=>{v.onseeked=()=>r();v.currentTime=t});

$('an').onclick=async()=>{
  if(!vfile)return;
  stop();$('an').disabled=true;$('bar').style.display='block';
  const v=document.createElement('video');v.muted=true;v.playsInline=true;v.preload='auto';v.src=URL.createObjectURL(vfile);
  try{await new Promise((r,j)=>{v.onloadeddata=r;v.onerror=j})}catch(e){msg('No se pudo leer el video.');$('an').disabled=false;return}
  vidDur=v.duration;const maxF=+$('maxF').value;let step=1/maxF,n=Math.floor(vidDur/step);
  if(n>400){n=400;step=vidDur/400;msg('Video largo: se muestrea a menos de '+maxF+' fps (máx. 400 muestras).')}
  const sz=+$('size').value,sc=sz?Math.min(1,sz/Math.max(v.videoWidth,v.videoHeight)):1;
  const w=Math.max(1,Math.round(v.videoWidth*sc)),h=Math.max(1,Math.round(v.videoHeight*sc));
  const mw=40,mh=Math.max(1,Math.round(40*h/w));
  const mc=document.createElement('canvas');mc.width=mw;mc.height=mh;const mx=mc.getContext('2d',{willReadFrequently:true});
  let prev=null;S=[];
  for(let i=0;i<n;i++){
    const t=i*step;await seek(v,Math.min(t+.001,vidDur-.01));
    const c=document.createElement('canvas');c.width=w;c.height=h;const cx=c.getContext('2d');cx.imageSmoothingQuality='high';cx.drawImage(v,0,0,w,h);
    mx.drawImage(v,0,0,mw,mh);const d=mx.getImageData(0,0,mw,mh).data;let m=0;
    if(prev){for(let k=0;k<d.length;k+=4)m+=Math.abs(d[k]-prev[k])+Math.abs(d[k+1]-prev[k+1])+Math.abs(d[k+2]-prev[k+2]);m/=(d.length/4)*3}
    prev=d.slice();S.push({c,t,m,keep:true,dur:null});
    $('bi').style.width=(i+1)/n*100+'%';
  }
  URL.revokeObjectURL(v.src);FW=w;FH=h;
  autoSel();build();$('bar').style.display='none';$('an').disabled=false;$('re').disabled=false;
  if(!$('msg').textContent)msg('Listo. Revisa la selección y ajusta lo que quieras.');
};

function autoSel(){
  const gp=+$('gap').value,mxf=+$('maxF').value,sn=+$('sens').value,cv=+$('curve').value,mn=1/gp;
  let last=-1e9,pk=0;
  S.forEach((s,i)=>{
    s.dur=null;pk=Math.max(pk,s.m);
    const f=mn+(mxf-mn)*Math.pow(Math.min(1,pk/sn),cv);
    if(i===0||s.t-last>=1/f-1e-6){s.keep=true;last=s.t;pk=0}else s.keep=false;
  });
}
$('re').onclick=()=>{stop();autoSel();refresh();msg('Selección recalculada.')};

