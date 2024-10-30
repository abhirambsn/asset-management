import { create } from "zustand";

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    type: "",
    openModal: (type: ModalType) => set({ isOpen: true, type }),
    closeModal: () => set({ isOpen: false, type: "" }),
}))