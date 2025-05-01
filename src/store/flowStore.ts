import { create } from 'zustand';
import { FlowStore } from '@/types/flow'; 

export const useFlowStore = create<FlowStore>((set) => ({
  data: {
    section1: { title: '', description: '' },
    section2: { content: '', media: '' },
    section3: { note: '', link: '' },
  },
  setData: (data) => set({ data }),
}));
