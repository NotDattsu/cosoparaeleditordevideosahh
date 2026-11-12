/* Importar */
$('imp').onchange=async e=>{
  const fs=[...e.target.files],png=fs.find(f=>/png$/i.test(f.name)||f.type==='image/png'),tx=fs.find(f=>/txt$/i.test(f.name));
  if(!png||!tx){msg('Elige el PNG y el .txt juntos.');return}
  try{
    const t=await tx.text(),h=t.match(/cols=.*frames=\d+/);
    if(!h)throw 0;
    const P={};[...h[0].matchAll(/(\w+)=(\d+)/g)].forEach(m=>P[m[1]]=+m[2]);
    const rows=t.split('\n').filter(l=>/^\d+\s+\d+\s+\d+\s+\d+/.test(l)).map(l=>l.trim().split(/\s+/).map(Number));
    const img=new Image();img.src=URL.createObjectURL(png);await img.decode();
    stop();S=[];
    rows.forEach(([i,col,row,ms])=>{
      const c=document.createElement('canvas');c.width=P.w;c.height=P.h;
      c.getContext('2d').drawImage(img,col*P.w,row*P.h,P.w,P.h,0,0,P.w,P.h);
      S.push({c,t:i,m:0,keep:true,dur:ms});
    });
    vidDur=0;FW=P.w;FH=P.h;build();$('re').disabled=true;
    msg('Importados '+S.length+' frames. Ya puedes previsualizar o exportar el APNG.');
  }catch(err){msg('No se pudo leer el spritesheet o el .txt.')}
  e.target.value='';
};
