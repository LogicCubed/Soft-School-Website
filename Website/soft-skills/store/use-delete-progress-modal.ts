import { create } from "zustand";

type DeleteProgressModalState = {
    isOpen: boolean;
    openDeleteProgressModal: () => void;
    closeDeleteProgressModal: () => void;
};

export const useDeleteProgressModal = create<DeleteProgressModalState>((set) => ({
    isOpen: false,
    openDeleteProgressModal: () => set({ isOpen: true }),
    closeDeleteProgressModal: () => set({ isOpen: false }),
}));