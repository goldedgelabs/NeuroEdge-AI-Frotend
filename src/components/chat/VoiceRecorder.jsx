import React, { useRef, useState } from 'react';
export default function VoiceRecorder({ onTranscription }) {
  const [rec, setRec] = useState(false);
  const t = useRef();
  const start = ()=> { setRec(true); t.current = setTimeout(()=> { onTranscription && onTranscription('Mock transcription'); }, 1400); }
  const stop = ()=> { setRec(false); clearTimeout(t.current); }
  return (<button className='btn' onPointerDown={start} onPointerUp={stop} onTouchStart={start} onTouchEnd={stop}>{rec? 'Recording...':'Hold to talk'}</button>)
}
