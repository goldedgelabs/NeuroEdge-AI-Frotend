import React, { useRef } from 'react';
import { saveAsset } from '../../lib/idb';
export default function AssetUploader({onSaved}){
  const ref = useRef();
  const pick = ()=> ref.current.click();
  const onFiles = async (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const url = URL.createObjectURL(file);
    await saveAsset(file.name, {name:file.name, url, type:file.type});
    onSaved && onSaved({[file.name]:url});
  }
  return (<div><input ref={ref} type='file' style={{display:'none'}} onChange={onFiles} /><button className='btn' onClick={pick}>Upload asset</button></div>)
}
