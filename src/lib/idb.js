import { openDB } from 'idb';
export async function getDB(){
  return openDB('neuroedge-db', 1, {
    upgrade(db){
      if(!db.objectStoreNames.contains('convos')) db.createObjectStore('convos', {keyPath:'id', autoIncrement:true});
      if(!db.objectStoreNames.contains('assets')) db.createObjectStore('assets');
      if(!db.objectStoreNames.contains('pending')) db.createObjectStore('pending', {autoIncrement:true});
    }
  });
}
export async function saveAsset(key, val){ const db = await getDB(); return db.put('assets', val, key); }
export async function getAsset(key){ const db = await getDB(); return db.get('assets', key); }
