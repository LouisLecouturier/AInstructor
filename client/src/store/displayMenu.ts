import { create } from "zustand";

type DisplayMenu = {
    isDisplay: boolean;
    ToggleDisplay: () => void;
    setDisplay: (newDisplay: boolean) => void;
};

export const addUserMenu = create<DisplayMenu>((set) => ({
    isDisplay: false,
    ToggleDisplay: () => {
        set(() => ({ isDisplay : !addUserMenu.getState().isDisplay }));
    },
    setDisplay: (newDisplay) => {
        set(() => ({ isDisplay: newDisplay }));
    },
}));
