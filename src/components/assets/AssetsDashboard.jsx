import React, { useState } from 'react';
import AssetUploader from './AssetUploader';
export default function AssetsDashboard(){
  const [assets, setAssets] = useState({});
  return (
    <div style={{padding:12}}>
      <h3>Assets (Founder dashboard)</h3>
      <p className='small'>Upload logos/icons; stored locally until backend connected.</p>
      <AssetUploader onSaved={a=> setAssets(prev=> ({...prev, ...a}))} />
      <div style={{marginTop:12}}><pre>{JSON.stringify(assets,null,2)}</pre></div>
    </div>
  )
}
