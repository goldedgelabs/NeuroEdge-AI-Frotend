import api from './client'
export const listAgents = ()=> api.get('/v1/agents')
export const runAgent = (id,p)=> api.post('/v1/agents/run',{agentId:id,input:p})
