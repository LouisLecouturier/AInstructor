import { useState } from "react"

import { SectionSelectStore, UserStore } from "@/store/store"

import Yellow from "@blob/yellow.svg"
import { signOut } from "next-auth/react";



interface Students {
    Homeworks: string;
    Teams: string;
    Import: string;
    Stats: string;
    Settings: string;
}

interface Teachers {
    Questionnaires: string;
    Teams: string;
    Stats: string;
    Settings: string;
}


const Students: Students = {
    Homeworks: "",
    Teams: "",
    Import: "",
    Stats: "",
    Settings: "",
};

const Teachers: Teachers = {
        Questionnaires: "",
        Teams: "",
        Stats: "",
        Settings: "",
    }



function DashboardSections({User} : {User: Students | Teachers}){

    const setSection = SectionSelectStore((state) => state.setSection);
    const section = SectionSelectStore((state) => state.sectionID);
    const sections = Object.keys(User).map((keyName: string, i: number) => (

        <div key={i} 
            onClick={() => setSection(i,keyName)} 
            className="w-full flex gap-5 items-center"
        >
            <div className="w-10 h-10 bg-dark-500">
                {User[keyName as keyof typeof User]}
            </div>

            <div className="relative">
                <span className="text-dark-500 text-xl font-extrabold">{keyName}</span>
                {section == i ? <div className="w-8 h-1 bg-primary-500 absolute top-6 rounded-md"/> : null}
            </div>

        </div>
    ))
    return(<>{sections}</>)
}



export default function DashboardMenu() {
    const typeUser = UserStore((state) => state.typeUser);
    const lastname = UserStore((state) => state.lastname);
    const firstname = UserStore((state) => state.firstname);

    const setTypeUser = UserStore((state) => state.setTypeUser);
    
    return (
        <div className="w-[325px] h-full relative shadow-lg bg-dark-10 flex flex-col justify-center items-center rounded-r-[5%]">
            <Yellow className="absolute -left-1/3 -top-1/3 w-full h-2/3"/>
            


            <div className="w-full z-0 h-1/4 flex justify-center pt-16">
                <div className="w-2/3 h-1/2 flex gap-5">

                    <div className="h-full flex justify-center items-center">
                        <div onClick={() => setTypeUser(typeUser == "Student" ? "Teacher" : "Student")} className="w-16 h-16 bg-accent-500 rounded-full"/>
                    </div>

                    <div className="h-full flex  justify-center flex-col">
                        <h1 className="text-dark-500 text-md font-bold">{firstname + " " + lastname}</h1>
                        <span className="text-dark-500 italic text-sm font-thin">{typeUser}</span>
                    </div>

                </div>
            </div>

            <div className="w-full h-2/4 flex justify-center items-center">
                <div className="w-2/3 h-3/4 flex gap-2 flex-col">
                    <DashboardSections User={typeUser == "Student" ? Students : Teachers}/>
                </div>
            </div>

            <div className="w-full h-1/4 flex justify-center items-end pb-16">
                <div onClick={() => signOut()} className="w-2/3 flex items-center gap-5">
                    <div className="w-10 h-10 bg-dark-500"/>
                    <h2 className="text-dark-500 text-lg font-bold">Log out</h2>
                </div>
            </div>

        </div>
    )
}