import React, { useContext } from 'react';
import { UIContext } from '../../context/UIContext';
import { motion } from 'framer-motion';
import ProfilePanel from './ProfilePanel';
import SettingsPanel from './SettingsPanel';
import { Link } from 'react-router-dom';
import MenuButtons from '../menu/MenuButtons';

export default function Hamburger(){
  const { sidebarOpen, setSidebarOpen } = useContext(UIContext);
  return (
    <>
      {sidebarOpen && <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.35)',zIndex:40}} onClick={()=> setSidebarOpen(false)} />}
      <motion.aside initial={{x:-420}} animate={{x: sidebarOpen?0:-420}} transition={{type:'spring',stiffness:140,damping:22}} className='panel' style={{position:'fixed',left:0,top:0,bottom:0,width:360,zIndex:50,display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div><strong>NeuroEdge</strong><div className='small'>All-in-one AI</div></div>
          <div><button className='btn' onClick={()=> setSidebarOpen(false)}>Close</button></div>
        </div>
        <div style={{marginTop:12}}><input placeholder='Search...' style={{width:'100%',padding:10,borderRadius:10,border:'1px solid rgba(255,255,255,0.04)'}} /></div>
        <div style={{marginTop:12,overflow:'auto',flex:1}}>
          <div style={{padding:8}}>
            <Link to='/chat' className='menu-btn' onClick={()=> setSidebarOpen(false)}>Chats</Link>
            <Link to='/' className='menu-btn' onClick={()=> setSidebarOpen(false)} style={{marginTop:8}}>Pages</Link>
            <Link to='/projects' className='menu-btn' style={{marginTop:8}} onClick={()=> setSidebarOpen(false)}>Projects</Link>
            <Link to='/agents' className='menu-btn' style={{marginTop:8}} onClick={()=> setSidebarOpen(false)}>Agents</Link>
            <Link to='/library' className='menu-btn' style={{marginTop:8}} onClick={()=> setSidebarOpen(false)}>Library</Link>
            <div style={{marginTop:12}}><strong className='small'>Quick Tools</strong><MenuButtons /></div>
          </div>
        </div>
        <div style={{padding:12,borderTop:'1px solid rgba(255,255,255,0.03)'}}>
          <ProfilePanel user={{name:'Joseph Were', email:'josephogwe8@gmail.com', phone:'+254712562780'}} />
          <SettingsPanel />
        </div>
      </motion.aside>
    </>
  )
}
