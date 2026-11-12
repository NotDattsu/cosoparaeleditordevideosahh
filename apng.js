/* APNG */
const CT=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc=u=>{let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CT[(c^u[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
const u32=n=>[(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255];
function chunk(type,data){
  const t=[...type].map(ch=>ch.charCodeAt(0)),body=new Uint8Array(4+data.length);body.set(t);body.set(data,4);
  const o=new Uint8Array(12+data.length);o.set(u32(data.length));o.set(body,4);o.set(u32(crc(body)),8+data.length);return o;
}
async function zlib(u){const cs=new CompressionStream('deflate'),w=cs.writable.getWriter();w.write(u);w.close();return new Uint8Array(await new Response(cs.readable).arrayBuffer())}

$('ex2').onclick=async()=>{
  if(typeof CompressionStream==='undefined'){msg('Este navegador no soporta la compresión necesaria para APNG.');return}
  const K=kept();msg('Generando APNG…');$('ex2').disabled=true;
  try{
    const parts=[new Uint8Array([137,80,78,71,13,10,26,10])];
    parts.push(chunk('IHDR',new Uint8Array([...u32(FW),...u32(FH),8,6,0,0,0])));
    parts.push(chunk('acTL',new Uint8Array([...u32(K.length),...u32(0)])));
    let seq=0;
    for(let j=0;j<K.length;j++){
      const ms=Math.min(65535,K[j].ms);
      parts.push(chunk('fcTL',new Uint8Array([...u32(seq++),...u32(FW),...u32(FH),...u32(0),...u32(0),(ms>>8)&255,ms&255,3,232,1,0])));
      const id=S[K[j].i].c.getContext('2d').getImageData(0,0,FW,FH).data;
      const raw=new Uint8Array((FW*4+1)*FH);
      for(let y=0;y<FH;y++)raw.set(id.subarray(y*FW*4,(y+1)*FW*4),y*(FW*4+1)+1);
      const z=await zlib(raw);
      if(j===0)parts.push(chunk('IDAT',z));
      else{const f=new Uint8Array(4+z.length);f.set(u32(seq++));f.set(z,4);parts.push(chunk('fdAT',f))}
      msg('Generando APNG… '+(j+1)+'/'+K.length);
    }
    parts.push(chunk('IEND',new Uint8Array(0)));
    if(await save('animacion.png',new Blob(parts,{type:'image/png'})))msg('APNG guardado (es un .png animado).');
  }catch(e){msg('Error al generar el APNG.')}
  $('ex2').disabled=false;
};

