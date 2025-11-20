import React, { useEffect, useRef, useState } from 'react';
import FileUploadMenu from './FileUploadMenu';
import VoiceRecorder from './VoiceRecorder';
import SendButton from './SendButton';
import { sendMessage, uploadFiles } from '../../lib/api';

export default function ChatInput({ onSend }){
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [files, setFiles] = useState([]);
  const [streamed, setStreamed] = useState('');
  const controllerRef = useRef(null);

  useEffect(()=>{ return ()=> { if(controllerRef.current) controllerRef.current.abort(); } },[]);

  const handleFiles = (f)=> setFiles(prev=>[...prev,...f]);

  const doSend = async ()=>{
    if(!text.trim() && files.length===0) return;
    setSending(true);
    setStreamed('');
    controllerRef.current = new AbortController();
    try{
      let uploaded = [];
      if(files.length) uploaded = await uploadFiles(files);
      await sendMessage(text, { signal: controllerRef.current.signal, onToken: (tok)=> setStreamed(s=> s + tok) });
      const reply = streamed || '...';
      onSend && onSend(text, { files: uploaded, reply });
      setText(''); setFiles([]);
    }catch(err){
      if(err.name === 'AbortError') { console.log('send aborted'); }
    }finally{
      setSending(false);
      controllerRef.current = null;
    }
  };

  const cancel = ()=>{
    if(controllerRef.current) controllerRef.current.abort();
    setSending(false);
  };

  return (
    <div>
      <div style={{display:'flex',gap:8,alignItems:'center'}} className='composer'>
        <FileUploadMenu onFilesSelected={handleFiles} />
        <VoiceRecorder onTranscription={(t)=> setText(prev=> prev? prev+' '+t : t)} />
        <textarea className='input-field' placeholder='Ask NeuroEdge...' value={text} onChange={e=> setText(e.target.value)} rows={1} onKeyDown={(e)=> { if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); doSend(); } }} />
        <SendButton sending={sending} onCancel={cancel} disabled={!text.trim() && files.length===0} onClick={doSend} />
      </div>
      {streamed && <div style={{marginTop:8}} className='panel small'>Streaming: {streamed}</div>}
    </div>
  )
}
