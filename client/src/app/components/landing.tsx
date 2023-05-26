import { signIn, useSession } from "next-auth/react";

export default function Landing() {
  const {data : session} = useSession();

  return (
    session?.user ? 
        <>
          <h1>connected</h1>
          <h1>{session.user.name}</h1>
        </> 
        : 
        <>
          <h1 onClick={() => signIn()}>not connected</h1>
        </>
    
  )
}