import React from 'react';
export default function MessageBubble({m}){
  return (
    <div className={m.role==='user'?'msg user':'msg bot'}>
      <div style={{fontSize:12,opacity:0.85}}>{m.role==='user'?'You':'NeuroEdge'}</div>
      <div style={{marginTop:6,whiteSpace:'pre-wrap'}}>{m.text}</div>
    </div>
  )
}
