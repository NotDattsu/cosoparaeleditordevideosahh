/* Guardado: descarga estándar con <a download> */
async function save(name,data){
  const blob=data instanceof Blob?data:new Blob([data],{type:'text/plain'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;
  document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),10000);return true;
}
const toBlob=c=>new Promise(r=>c.toBlob(r,'image/png'));
