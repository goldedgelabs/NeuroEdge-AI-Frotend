import api from './client'
export const sendChat = (p)=> api.post('/v1/chat', p)
export const streamChatUrl = ()=> (import.meta.env.VITE_WS_BASE || 'ws://localhost:8080') + '/v1/chat/stream'
