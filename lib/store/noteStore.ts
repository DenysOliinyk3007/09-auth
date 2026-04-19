import { create } from 'zustand';
import { persist } from 'zustand/middleware'



type draftType = {
    title: string,
    content: string,
    tag: string,
}

type NoteDraftStore = {
  draft: draftType;
  setDraft: (note: draftType) => void;
  clearDraft: () => void;
};

const initialDraft = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
      (set) => ({
        draft: initialDraft,
        setDraft: (note) => set({ draft: note }),
        clearDraft: () => set({ draft: initialDraft }),
      }),
      {
        name: 'note-draft',
      }
    )
  )