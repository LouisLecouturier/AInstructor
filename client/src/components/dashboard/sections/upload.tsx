export default function Import() {
    return (
        <div className="flex-1 h-screen flex flex-col gap-8 px-20 pt-16 pb-32">

            <h1 className="text-6xl font-black">
                Import a course
            </h1>

            <span className="text-lg">
                Donec ultricies mauris a nunc posuere, et sodales sem efficitur. In hac habitasse platea dictumst. Vestibulum vulputate quam at dapibus euismod. Praesent vulputate lorem vel cursus lacinia. 
            </span>

            <div className="flex w-full flex-1 justify-center items-center">
                <div className="flex w-2/3 h-full rounded-3xl border-dashed border-2 border-accent-900 justify-center items-center">
                    <div className="flex flex-col gap-5 items-center">
                        <div className="w-24 h-24 bg-accent-500"/>
                        <div className="flex flex-col items-center">

                            <span className="text-2xl font-bold">
                                Drop file to upload
                            </span>

                            <span className="text-lg italic">
                                or <span className="text-primary-400">browse</span> to choose a file
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}