import React, { useRef } from 'react';
export default function FileUploadMenu({ onFilesSelected }) {
  const fileRef = useRef();
  const pick = ()=> fileRef.current.click();
  const handle = (e)=> { const files = Array.from(e.target.files || []); onFilesSelected && onFilesSelected(files); };
  return (<div style={{display:'flex',gap:8,alignItems:'center'}}><button className='btn' onClick={pick}>Upload</button><input ref={fileRef} type='file' multiple style={{display:'none'}} onChange={handle} /></div>)
}
