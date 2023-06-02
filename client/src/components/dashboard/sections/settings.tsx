import EditButton from "@/components/button/editbutton";

export default function Settings() {
    return (
        <div className="flex-1 h-full flex flex-col gap-8">

            <h1 className="text-6xl font-black">Settings</h1>

            <div className="flex flex-1 overflow-hidden w-full flex-col">

                <div className="flex w-full h-1 px-16">
                    <div className="flex-1 bg-dark-400 h-1 rounded-full"/>
                </div>


                <div className="px-20 flex-col pt-8 pb-16 flex-1 overflow-auto flex gap-8">

                    <h2 className="text-3xl font-extrabold">Account</h2>

                    <div className="flex items-center px-10 py-5 justify-between bg-white w-full max-w-[800px] rounded-xl shadow-md">
                        <div className="flex items-center gap-5">
                            <div className="w-20 h-20 rounded-full bg-accent-500"/>

                            <div className="flex flex-col">
                                <span className="text-md font-bold text-dark-500">Johana Doetek</span>
                                <span className="text-sm  italic text-dark-500">Student</span>
                                <span className="text-sm text-dark-500">JUNIA ISEN LILLE</span>
                            </div> 

                        </div>
                        <EditButton/>
                    </div>

                    <div className="flex flex-col gap-5 px-10 py-5 bg-white w-full max-w-[800px] rounded-xl shadow-md">

                        <div className="flex items-center justify-between">
                            <span className="text-xl font-extrabold text-dark-500">Personnal information</span>
                            <EditButton/>
                        </div>

                        <div className="flex flex-col gap-3">

                            <div className="flex items-center">
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">Firstname : </span>
                                    <span className="text-sm text-dark-500">Johana</span>
                                </div>
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">Lastname : </span>
                                    <span className="text-sm text-dark-500">Doetek</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">Email address : </span>
                                    <span className="text-sm text-dark-500">antoine.ae@fmt.fr</span>
                                </div>
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">Phone : </span>
                                    <span className="text-sm text-dark-500">+337853556</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">Bio : </span>
                                    <span className="text-sm text-dark-500">French Student from JUNIA ISEN</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col gap-5 px-10 py-5 bg-white w-full max-w-[800px] rounded-xl shadow-md">
                    <div className="flex items-center justify-between">
                            <span className="text-xl font-extrabold text-dark-500">Address</span>
                            <EditButton/>
                        </div>

                        <div className="flex flex-col gap-3">

                            <div className="flex items-center">
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">Street & number : </span>
                                    <span className="text-sm text-dark-500">22 rue du grand but</span>
                                </div>
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">Country : </span>
                                    <span className="text-sm text-dark-500">France</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">City/State : </span>
                                    <span className="text-sm text-dark-500">Lille</span>
                                </div>
                                <div className="flex-1 flex-col flex">
                                    <span className="text-md font-bold text-dark-500">Postal code: </span>
                                    <span className="text-sm text-dark-500">59000</span>
                                </div>
                            </div>


                        </div>

                        
                    </div>

                </div>
            </div>
        </div>
    )
}