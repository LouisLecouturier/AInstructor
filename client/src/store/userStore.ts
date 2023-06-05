import { create } from "zustand";

type UserStore = {
  userType: "student" | "teacher";
  firstname: string;
  lastname: string;
  setUserType: (newTypeUser: "student" | "teacher") => void;
};

export const UserStore = create<UserStore>((set) => ({
  userType: "student",
  firstname: "Antoine",
  lastname: "Maes",
  setUserType: (newTypeUser) => {
    set(() => ({ userType: newTypeUser }));
  },
}));
