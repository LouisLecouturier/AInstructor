import { useState } from "react"


interface Students {
    Homeworks: string;
    Teams: string;
    Create: string;
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
    Homeworks: "d",
    Teams: "e",
    Create: "r",
    Stats: "g",
    Settings: "",
};

const Teachers: Teachers = {
        Questionnaires: "",
        Teams: "",
        Stats: "",
        Settings: "",
    }



function DashboardSections({User, sectionSelected, setSectionSelected} : {User: Students | Teachers, sectionSelected: string, setSectionSelected: any}){
    const handleSectionClick = (keyName: string) => {
        setSectionSelected(keyName);
      };

    const sections = Object.keys(User).map((keyName: string, i: number) => (
        <div key={i} onClick={() => handleSectionClick(keyName)} className="w-full flex gap-5 items-center">
            <div className="w-10 h-10 bg-dark-500">{User[keyName as keyof typeof User]}</div>
            <div className="relative">
                <span className="text-dark-500 text-lg font-bold">{keyName}</span>
                {sectionSelected == keyName ? <div className="w-8 h-1 bg-primary-500 absolute top-6 rounded-md"/> : null}
            </div>
        </div>
    ))
    return(<>{sections}</>)
}



export default function DashboardMenu() {
    const [typeUser, setTypeUser] = useState("Students");
    const [sectionSelected , setSectionSelected] = useState(typeUser == "Students" ? "Homeworks": "Questionnaires");
    
    return (
        <div className="w-[300px] h-full bg-dark-10 flex flex-col justify-center items-center rounded-r-[5%]">
            <div className="w-full h-1/4 flex justify-center pt-16">
                <div className="w-2/3 h-1/2 flex gap-5">
                    <div className="h-full flex justify-center items-center">
                        <div onClick={() => typeUser == "Students" ? setTypeUser("Teachers") : setTypeUser("Students")} className="w-16 h-16 bg-accent-500 rounded-full"/>
                    </div>
                    <div className="h-full flex  justify-center flex-col">
                        <h1 className="text-dark-500 text-md font-bold">Johana Doetek</h1>
                        <span className="text-dark-500 italic text-sm font-thin">{typeUser}</span>
                    </div>

                </div>
            </div>
            <div className="w-full h-2/4 flex justify-center items-center">
                <div className="w-2/3 h-3/4 flex gap-2 flex-col">
                    <DashboardSections User={typeUser == "Students" ? Students : Teachers} setSectionSelected={setSectionSelected} sectionSelected={sectionSelected}/>
                
                </div>
            </div>
            <div className="w-full h-1/4 flex justify-center items-end pb-16">
                <div className="w-2/3 flex items-center gap-5">
                    <div className="w-10 h-10 bg-dark-500"/>
                    <h2 className="text-dark-500 text-lg font-bold">Log out</h2>
                </div>
            </div>

        </div>
    )
}