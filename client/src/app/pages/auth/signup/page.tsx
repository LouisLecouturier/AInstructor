'use client'

import FormButton from "@components/button/formbutton"
import AuthForm from "@components/form/authForm"
import { useRef, useState } from "react"
import Image from 'next/image';

import Purple from '@blob/purple.svg'
import Yellow from '@blob/yellow.svg'
import { redirect } from "next/navigation";

export default function SignUp() {

  function onSubmit() {
    const res = fetch("http://localhost:8000/api/signup", {
        method : 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "firstname" : firstname.current,
            "lastname" : lastname.current,
            "password" : password.current,
            "email" : email.current,
            "phone" : phone.current,
            "type": role.current

        })
    })
    .then(response => response.json())
    .then(data => {
      const status = data.status;
      console.log(status)
    })
    .catch(error => {
      // Gérer les erreurs de la requête ici
      console.error(error);
    }); 
  }

  const firstname = useRef(null)
  const lastname = useRef(null)
  const password = useRef(null)
  const email = useRef(null)
  const phone = useRef(null)
  const role = useRef(null)

    return (
      <>
        <Purple className="fixed -left-1/4 -top-1/4 w-2/3 h-2/3"/>
        <Yellow className="fixed -right-1/4 -bottom-1/4 w-2/3 h-2/3"/>

        <div className="h-full w-full z-0 relative top-0 left-0 flex justify-center items-center">

          <div className="w-2/5 h-4/6 bg-white flex flex-col rounded-lg p-10">
            
            <h1 className="text-6xl font-bold">
              Welcome !
            </h1>

            <h1 className="text-xl font-light">
              Sign up to create a new account 
            </h1>

            <div className="w-full h-full flex flex-col justify-center items-start gap-5">

              <AuthForm placeholder="Firstname" content={firstname}/>
              <AuthForm placeholder="Lastname" content={lastname} />
              <AuthForm placeholder="Password" content={password} />
              <AuthForm placeholder="Email" content={email} />
              <AuthForm placeholder="Phone" content={phone} />
              <AuthForm placeholder="Role" content={role} />



              
              
            </div>

            <FormButton onSubmit={onSubmit} text="Sign Up" />

          </div>
        </div>
      </>

      
    )
  }