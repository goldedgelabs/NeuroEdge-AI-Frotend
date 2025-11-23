import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './router/routes'
import Sidebar from './components/layout/Sidebar'
export default function App(){ return (<BrowserRouter><div className='flex'><Sidebar /><Routes /></div></BrowserRouter>) }
