export type FlowData = {
    section1: { title: string; description: string };
    section2: { content: string; media: string };
    section3: { note: string; link: string };
  };
  export type FlowStore = {
    data: FlowData;
    setData: (data: FlowData) => void;
  };
  