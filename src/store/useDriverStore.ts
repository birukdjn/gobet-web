import { create } from 'zustand';

interface DriverStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useDriverStore = create<DriverStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));