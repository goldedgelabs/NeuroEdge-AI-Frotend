import api from './client'
export const tts = (text)=> api.post('/v1/audio/tts', { text }, { responseType:'arraybuffer' })
