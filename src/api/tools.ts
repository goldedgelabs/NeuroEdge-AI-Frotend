import api from './client'
export const listTools = ()=> api.get('/v1/tools')
export const runTool = (id,p)=> api.post(`/v1/tools/${id}/run`, p)
