import React from 'react';
import Header from './components/layout/Header';
import Hamburger from './components/layout/Hamburger';
import FloatingAssistant from './components/layout/FloatingAssistant';
import { UIProvider } from './context/UIContext';
import { AuthProvider } from './context/AuthContext';
import { AssetsProvider } from './context/AssetsContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Agents from './pages/Agents';
import Projects from './pages/Projects';
import Library from './pages/Library';
import Marketplace from './pages/Marketplace';
import AssetsPage from './pages/AssetsPage';
import Settings from './pages/Settings';
import Help from './pages/Help';

export default function App(){
  return (
    <UIProvider>
      <AuthProvider>
        <AssetsProvider>
          <SubscriptionProvider>
            <Header />
            <Hamburger />
            <div className='app-shell' style={{display:'flex',gap:12}}>
              <main style={{flex:1}} className='panel'>
                <Routes>
                  <Route path='/' element={<Home/>} />
                  <Route path='/chat' element={<Chat/>} />
                  <Route path='/agents' element={<Agents/>} />
                  <Route path='/projects' element={<Projects/>} />
                  <Route path='/library' element={<Library/>} />
                  <Route path='/marketplace' element={<Marketplace/>} />
                  <Route path='/assets' element={<AssetsPage/>} />
                  <Route path='/settings' element={<Settings/>} />
                  <Route path='/help' element={<Help/>} />
                </Routes>
              </main>
            </div>
            <FloatingAssistant />
          </SubscriptionProvider>
        </AssetsProvider>
      </AuthProvider>
    </UIProvider>
  )
}
