import React, { useContext } from 'react';
import { UIContext } from '../../context/UIContext';
import { FiMenu } from 'react-icons/fi';
import ThreeDots from './ThreeDots';
export default function Header(){
  const { setSidebarOpen } = useContext(UIContext);
  return (
    <header className='header panel'>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button className='btn' onClick={()=> setSidebarOpen(true)} aria-label='Open menu'><FiMenu size={20} /></button>
        <div className='brand'><img src='/icons/icon-192.png' alt='logo'/> <div style={{marginLeft:8}}><div style={{fontWeight:700}}>NeuroEdge</div><div className='small'>AI assistant</div></div></div>
      </div>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <ThreeDots status='online' />
        <button className='btn btn--primary'>Subscribe</button>
      </div>
    </header>
  )
}
