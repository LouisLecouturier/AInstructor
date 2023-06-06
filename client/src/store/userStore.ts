import { create } from "zustand";

type UserStore = {
  id: string;
  userType: "student" | "teacher";
  firstname: string;
  lastname: string;
  setUserType: (newTypeUser: "student" | "teacher") => void;
};

export const UserStore = create<UserStore>((set) => ({
  id: "2",
  userType: "teacher",
  firstname: "Antoine",
  lastname: "Maes",
  setUserType: (newTypeUser) => {
    set(() => ({ userType: newTypeUser }));
  },
}));
