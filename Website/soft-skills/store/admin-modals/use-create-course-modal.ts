import { create } from "zustand";

type CreateCourseModalState = {
    isOpen: boolean;
    openCreateCourseModal: () => void;
    closeCreateCourseModal: () => void;
};

export const useCreateCourseModal = create<CreateCourseModalState>((set) => ({
    isOpen: false,
    openCreateCourseModal: () => set({ isOpen: true }),
    closeCreateCourseModal: () => set({ isOpen: false }),
}));