import React from 'react';
import MenuButtons from '../components/menu/MenuButtons';

export default function Home() {
  return (
    <div className='p-4'>
      <div className='panel'>
        <h2 className='text-xl font-semibold'>Welcome to NeuroEdge</h2>

        <p className='small mt-2'>
          Users Choice-First, NeuroEdge AI assistant.
        </p>

        <div className='mt-4'>
          <MenuButtons />
        </div>
      </div>
    </div>
  );
}
