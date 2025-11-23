import api from './client'
export const analyzeImage = (payload)=> api.post('/v1/vision/analyze', payload)
