import React, { useContext, useEffect, useState } from 'react';
import { UIContext } from '../../context/UIContext';
import { motion } from 'framer-motion';
import ChatInput from '../chat/ChatInput';

export default function FloatingAssistant(){
  const { floatingOpen, setFloatingOpen } = useContext(UIContext);
  const [reminderShown, setReminderShown] = useState(false);

  useEffect(()=>{
    const last = Number(localStorage.getItem('neuroedge_reminder') || 0);
    const twiceADay = 1000*60*60*12;
    if(Date.now() - last > twiceADay){
      setReminderShown(true);
      localStorage.setItem('neuroedge_reminder', String(Date.now()));
      setTimeout(()=> setReminderShown(false), 7000);
    }
  },[]);

  return (
    <div className='floating-assistant'>
      {reminderShown && <div className='panel small'>Click for Floating chat</div>}
      {floatingOpen && (
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className='panel' style={{width:360,maxWidth:'90vw'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong>NeuroEdge</strong><div><button className='btn' onClick={()=> setFloatingOpen(false)}>Close</button></div></div>
          <div style={{height:280,overflow:'auto',marginTop:8}}><div className='small'>Floating chat (click <strong>Scan page</strong> to collect page text — mock only)</div></div>
          <div style={{marginTop:8}}><button className='btn' onClick={()=> alert('Page scan (mock). Implement backend to actually scan page.')}>Scan page</button></div>
          <ChatInput onSend={(t)=> alert('Floating send (mock): '+t)} />
        </motion.div>
      )}
      <button className='floating-button' onClick={()=> setFloatingOpen(s=>!s)} aria-label='Open NeuroEdge assistant'>NE</button>
    </div>
  )
}
