import React, { useEffect, useState } from 'react';
export default function ThreeDots({ status = 'offline' }){
  const [phase, setPhase] = useState(0);
  useEffect(()=>{
    let interval;
    if(status === 'online') interval = setInterval(()=> setPhase(p=> (p+1)%3), 400);
    if(status === 'reconnecting') interval = setInterval(()=> setPhase(p=> (p+1)%3), 700);
    if(status === 'offline') interval = setInterval(()=> setPhase(p=> (p+1)%3), 900);
    return ()=> clearInterval(interval);
  },[status]);
  const color = status==='online'? '#39d353': status==='reconnecting'? '#ffcc00':'#ff4d4f';
  return (<div style={{display:'flex',gap:6,alignItems:'center'}} aria-label={`status ${status}`}><span style={{width:8,height:8,borderRadius:999,opacity: phase===0?1:0.25,background:color}}></span><span style={{width:8,height:8,borderRadius:999,opacity: phase===1?1:0.25,background:color}}></span><span style={{width:8,height:8,borderRadius:999,opacity: phase===2?1:0.25,background:color}}></span></div>)
}
