import { create } from "zustand";

interface SectionSelectStore {
  sectionID: number;
  sectionName: string;
  setSection: (sectionID: number, sectionName: string) => void;
}

interface UserStore {
    typeUser: "Student" | "Teacher";
    firstname: string;
    lastname: string;
    setTypeUser: (newTypeUser: "Student" | "Teacher") => void;
}


export const UserStore = create<UserStore>((set) => ({   
    typeUser : "Student",
    firstname: "Johana",
    lastname: "Doetek",
    setTypeUser: (newTypeUser) => {
        set(() => ({typeUser: newTypeUser})); // Set type user from argument of method
        SectionSelectStore.getState().setSection(0, ""); // Reset section when toggling user type
    }
  }));

export const SectionSelectStore = create<SectionSelectStore>((set) => ({
    sectionID: 0,
    sectionName: "",
    setSection: (newSectionID, newSectionName) => {
        set(() => ({sectionID: newSectionID, sectionName: newSectionName})); // Set section id & name from argument of method
    }
}));

