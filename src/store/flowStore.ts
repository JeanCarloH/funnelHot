import { create } from 'zustand';
import { FlowData } from '@/types/flow'; 


type FlowStore = {
  data: FlowData;
  setData: (data: FlowData) => void;
};

export const useFlowStore = create<FlowStore>((set) => ({
  data: {
    section1: { title: '', description: '' },
    section2: { content: '', media: '' },
    section3: { note: '', link: '' },
  },
  setData: (data) => set({ data }),
}));
