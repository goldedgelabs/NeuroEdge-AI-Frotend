import create from 'zustand'
export const useAgentsStore = create(set=>({ agents:[], setAgents:(a)=>set({agents:a}) }))
