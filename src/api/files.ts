import api from './client'
export async function uploadFile(file,onProgress){ const f = new FormData(); f.append('file',file); return api.post('/v1/files/upload', f, { headers:{'Content-Type':'multipart/form-data'}, onUploadProgress:(e)=>{ if(e.total) onProgress?.(Math.round((e.loaded/e.total)*100)) } }) }
