const USE_MOCK = true;
const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/,'') || '/api';

export function sendMessage(text, {signal, onToken} = {}){
  if(!USE_MOCK){
    const ctrl = new AbortController();
    if(signal) signal.addEventListener('abort', ()=> ctrl.abort());
    return fetch(API_BASE + '/send', {method:'POST', body: JSON.stringify({text}), signal: ctrl.signal, headers:{'Content-Type':'application/json'}}).then(r=> r.json());
  }
  return new Promise((resolve, reject) => {
    if(signal && signal.aborted) return reject(new DOMException('Aborted','AbortError'));
    const tokens = ('NeuroEdge reply for: ' + text).split(' ');
    let i = 0;
    const id = setInterval(()=>{
      if(signal && signal.aborted){ clearInterval(id); return reject(new DOMException('Aborted','AbortError')); }
      const token = tokens[i++];
      if(onToken) onToken(token + (i<tokens.length? ' ':''));
      if(i >= tokens.length){ clearInterval(id); return resolve({ok:true, reply: tokens.join(' ')}); }
    }, 150);
    if(signal) signal.addEventListener('abort', ()=> { clearInterval(id); reject(new DOMException('Aborted','AbortError')); });
  });
}

export async function uploadFiles(files){
  if(USE_MOCK) return Promise.resolve(files.map((f,i)=> ({id:'mock-'+i, name:f.name, url:URL.createObjectURL(f)})));
  const form = new FormData();
  files.forEach(f=> form.append('files', f));
  const r = await fetch(API_BASE + '/upload', {method:'POST', body: form});
  return r.json();
}

export async function transcribeAudio(blob){
  if(USE_MOCK) return Promise.resolve('Mock transcription');
  const form = new FormData(); form.append('file', blob);
  const r = await fetch(API_BASE + '/transcribe', {method:'POST', body: form});
  return r.json();
}

export async function getUser(){
  if(USE_MOCK) return Promise.resolve({name:'Joseph Were', email:'josephogwe8@gmail.com', phone:'+254712562780', plan:'free'});
  const r = await fetch(API_BASE + '/user');
  return r.json();
}
