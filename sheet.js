$('ex1').onclick=async()=>{
  const K=kept(),n=K.length,cols=Math.ceil(Math.sqrt(n)),rows=Math.ceil(n/cols);
  const c=document.createElement('canvas');c.width=cols*FW;c.height=rows*FH;const x=c.getContext('2d');
  if(c.width*c.height>16777216)msg('Aviso: el spritesheet es muy grande y puede no guardarse bien. Considera un tamaño menor.');
  let txt='SPRITESHEET v1\ncols='+cols+' rows='+rows+' w='+FW+' h='+FH+' frames='+n+'\n# indice columna fila duracion_ms\n';
  K.forEach((k,j)=>{const col=j%cols,row=Math.floor(j/cols);x.drawImage(S[k.i].c,col*FW,row*FH);txt+=j+' '+col+' '+row+' '+k.ms+'\n'});
  msg('Guardando…');
  const a=await save('spritesheet.png',await toBlob(c));
  const b=await save('spritesheet.txt',txt);
  if(a&&b)msg('Spritesheet y .txt guardados.');
};

