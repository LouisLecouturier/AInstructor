export default function AuthForm({placeholder, content}: {placeholder:string, content:any}) {



    return (
        <input 
            className="w-full bg-dark-10 h-12 text-xs rounded-sm px-5" 
            placeholder={placeholder}
            onChange={(e) => content.current = e.target.value}
        />

    )
}
