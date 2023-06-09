export default function FormButton({onSubmit, text}: {onSubmit:any, text:string }) {

    return(
<<<<<<< HEAD
        <button onClick={onSubmit}className="w-full h-1/4 bg-accent-500 flex justify-center items-center text-sm rounded-md shadow-md ">
=======
        <button onClick={onSubmit} className="w-full h-1/4 bg-accent-500 flex justify-center items-center text-sm rounded-md shadow-md ">
>>>>>>> origin/FullStack
            <span className="text-white text-lg font-bold">{text}</span>
        </button>
    )
}