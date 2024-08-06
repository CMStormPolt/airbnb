import { create } from 'zustand';

interface RegistarModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useRegister = create<RegistarModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));