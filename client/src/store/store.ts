import {create} from "zustand";
import {useState} from "react";

interface SectionSelectStore {
    sectionID: number;
    sectionName: string;
    setSection: (sectionID: number, sectionName:string) => void;
}

interface UserStore {
    typeUser: "Student" | "Teacher";
    firstname: string;
    lastname: string;
    setTypeUser: (newTypeUser: "Student" | "Teacher") => void;
}

interface UserTeamsStore {
    teams: {
        id: number;
        name: string;
        members: string[];
        color: string;
        Homeworks: any[];
    }[];
}




export const UserStore = create<UserStore>((set) => ({   
    typeUser : "Student",
    firstname: "Johana",
    lastname: "Doetek",
    setTypeUser: (newTypeUser) => {
        set(() => ({typeUser: newTypeUser}));
        SectionSelectStore.getState().setSection(0, "");
    }
  }));

export const SectionSelectStore = create<SectionSelectStore>((set) => ({
    sectionID: 0,
    sectionName: "",
    setSection: (newSectionID, newSectionName) => {
        set(() => ({sectionID: newSectionID, sectionName: newSectionName}));
    }
}));


export const UserTeamsStore = create((set) => ({
    teams: [
        {
            "id": 1, 
            "name": "English - 4B",
            "members": [],
            "color": "#FF0000",
        },
        {
            "id": 2, 
            "name": "Mathematics",
            "members": [],
            "color": "#00FF00",
        },
    ],
}));

export const UserHomeworksStore = create((set) => ({
    homeworks: [
        {
            "id": 1,
            "name": "Homework 1",
            "deliveryDate": "2021-05-01",
            "creationDate": "2021-04-01",
            "status": "Not delivered",
            "teamID": 1,
        },
        {
            "id": 2,
            "name": "Homework 2",
            "deliveryDate": "2021-05-01",
            "creationDate": "2021-04-01",
            "status": "Not delivered",
            "teamID": 1,
        },
        {
            "id": 3,
            "name": "Homework 3",
            "deliveryDate": "2021-05-01",
            "creationDate": "2021-04-01",
            "status": "Not delivered",
            "teamID": 2,
        },
    ]
}));
            