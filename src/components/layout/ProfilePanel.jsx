import React from 'react';
export default function ProfilePanel({user}){
  return (
    <div style={{marginTop:8,padding:10,borderRadius:8,background:'rgba(255,255,255,0.02)'}}>
      <div style={{fontWeight:700}}>{user?.name}</div>
      <div className='small'>{user?.email}</div>
      <div className='small'>{user?.phone}</div>
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <button className='btn'>Message</button>
        <a className='btn' href={`https://wa.me/${(user?.phone||'').replace(/\D/g,'')}`} target='_blank' rel='noreferrer'>WhatsApp</a>
      </div>
    </div>
  )
}
