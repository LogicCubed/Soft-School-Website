import { create } from "zustand";

type CreateUnitModalState = {
    isOpen: boolean;
    openCreateUnitModal: () => void;
    closeCreateUnitModal: () => void;
};

export const useCreateUnitModal = create<CreateUnitModalState>((set) => ({
    isOpen: false,
    openCreateUnitModal: () => set({ isOpen: true }),
    closeCreateUnitModal: () => set({ isOpen: false }),
}));