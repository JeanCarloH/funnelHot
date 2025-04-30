import { create } from 'zustand';

type FlowData = {
  section1: { title: string; description: string };
  section2: { content: string; media: string };
  section3: { note: string; link: string };
};

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
