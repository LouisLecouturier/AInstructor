'use client'

import { signIn } from "next-auth/react"
import FormButton from "@components/button/formbutton"
import AuthForm from "@components/form/authForm"
import { useRef, useState } from "react"
import Image from 'next/image';

import Purple from '@blob/purple.svg'
import Yellow from '@blob/yellow.svg'

export default function Login() {

  async function onSubmit() {
    const res = await signIn('credentials', {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/'
    })
  }

  const username = useRef(null)
  const password = useRef(null)

    return (
      <>
        <Purple className="fixed -left-1/4 -top-1/4 w-2/3 h-2/3"/>
        <Yellow className="fixed -right-1/4 -bottom-1/4 w-2/3 h-2/3"/>

        <div className="h-full w-full z-0 relative top-0 left-0 flex justify-center items-center">

          <div className="w-2/5 h-4/6 bg-white flex flex-col rounded-lg p-10">
            
            <h1 className="text-4xl font-bold">
              Welcome back !
            </h1>

            <h1 className="text-xl font-light">
              Sign in to your accounts
            </h1>

            <div className="w-full h-full flex flex-col justify-center items-start gap-5">

              <AuthForm placeholder="Username" content={username}/>
              <AuthForm placeholder="Password" content={password} />
              
              <div className="w-full flex justify-end">

                <a href="#" className="text-accent-500 text-sm font-bold">
                  Forgot password ?*
                </a>

              </div>
            </div>

            <FormButton onSubmit={onSubmit} text="Login" />

          </div>
        </div>
      </>

      
    )
  }