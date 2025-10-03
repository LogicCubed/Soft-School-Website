import { create } from "zustand";

interface DeleteCourseModalState {
  isOpen: boolean;
  courseIdToDelete: number | null;
  courseNameToDelete: string | null;
  pendingDeletes: Set<number>;
  openDeleteCourseModal: (courseId: number, courseName: string) => void;
  closeDeleteCourseModal: () => void;
  addPendingDelete: (courseId: number) => void;
  clearPendingDeletes: () => void;
}

export const useDeleteCourseModal = create<DeleteCourseModalState>((set) => ({
  isOpen: false,
  courseIdToDelete: null,
  courseNameToDelete: null,
  pendingDeletes: new Set(),
  
  openDeleteCourseModal: (courseId, courseName) =>
    set({
      isOpen: true,
      courseIdToDelete: courseId,
      courseNameToDelete: courseName,
    }),

  closeDeleteCourseModal: () =>
    set({
      isOpen: false,
      courseIdToDelete: null,
      courseNameToDelete: null,
    }),

  addPendingDelete: (courseId) =>
    set((state) => {
      const newSet = new Set(state.pendingDeletes);
      newSet.add(courseId);
      return { pendingDeletes: newSet };
    }),

  clearPendingDeletes: () => set({ pendingDeletes: new Set() }),
}));