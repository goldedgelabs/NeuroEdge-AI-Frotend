import React from 'react';
export default function PremiumModal({open, onClose, feature}){
  if(!open) return null;
  return (
    <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:200}}>
      <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.5)'}} onClick={onClose} />
      <div style={{width:520,maxWidth:'94vw',padding:20,background:'var(--bg)',borderRadius:12,border:'1px solid rgba(255,255,255,0.04)'}}>
        <h3>Upgrade for {feature}</h3>
        <p className='small'>This feature is part of NeuroEdge paid plans. Subscribe to unlock advanced capabilities. Trial: 3 months free on registration.</p>
        <div style={{display:'flex',gap:8,marginTop:12}}><button className='btn btn--primary'>Subscribe $3.99/mo</button><button className='btn' onClick={onClose}>Close</button></div>
      </div>
    </div>
  )
}
