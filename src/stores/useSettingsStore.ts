import create from 'zustand'
export const useSettingsStore = create(set=>({ theme:'dark', setTheme:(t)=>set({theme:t}) }))
