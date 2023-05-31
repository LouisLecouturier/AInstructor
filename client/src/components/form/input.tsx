export default function Input({placeholder, content}: {placeholder:string, content:any}) {



    return (
        <input 
            className="w-full bg-white h-12 font-semibold rounded-lg px-4 text-dark-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-20"
            placeholder={placeholder}
            onChange={(e) => content.current = e.target.value}
        />

    )
}
