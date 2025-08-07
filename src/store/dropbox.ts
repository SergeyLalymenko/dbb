import { create } from 'zustand';
import { Dropbox } from 'dropbox';

type DropboxStateType = {
    dropbox: Dropbox | null;
    isLoadError: boolean;
    setDropbox: (value: Dropbox | null) => void;
    setIsLoadError: (value: boolean) => void;
};

export const useDropboxStore = create<DropboxStateType>((set) => ({
    dropbox: null,
    isLoadError: false,
    setDropbox: (value) => set({ dropbox: value }),
    setIsLoadError: (value) => set({ isLoadError: value }),
}));
