function drawF(i){const p=$('pv'),x=p.getContext('2d');x.clearRect(0,0,p.width,p.height);if(S[i])x.drawImage(S[i].c,0,0)}
function stop(){playing=false;clearTimeout(timer);$('pl').textContent='▶ Reproducir'}
function tick(){
  const K=kept();if(!playing||!K.length)return stop();
  pi%=K.length;drawF(K[pi].i);timer=setTimeout(()=>{pi++;tick()},K[pi].ms);
}
$('pl').onclick=()=>{if(playing)return stop();playing=true;pi=0;$('pl').textContent='⏸ Pausar';tick()};

