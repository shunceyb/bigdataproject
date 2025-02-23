"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../actions/register";
import Image from 'next/image'
import Razer from '@/app/images/background.png'
import { ArrowLeft } from 'lucide-react'


export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const r = await register({
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name")    
      });
      ref.current?.reset();
      if(r?.error){
        setError(r.error);
        return;
      } else {
        return router.push("/login");
      }
};

return(
    <section className="w-full h-screen flex items-center justify-center bg-black gap-40">
        <Image src={Razer} width={500} height={500} alt="Logo"/>
          <form ref = {ref}
            action={handleSubmit}
            className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
            bg-transparent text-green-400 rounded">
            {error && <div className="text-red-400">{error}</div>}
            <div className="flex gap-2">
            <Link href="/"><ArrowLeft size={50} className=""/></Link>
            <h1 className="mb-5 w-full text-4xl font-bold text-center font-razer">Register</h1>
            </div>
            <label className="w-full text-2xl gap-2 font-razer">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full h-20 border border-solid border-black bg-transparent text-white rounded-2xl p-2 "
              name="name"
            />
            <br></br>
            <label className="w-full text-2xl font-razer">Email</label>
            
            <input
              type="email"
              placeholder="Email"
              className="w-full h-20 border border-solid border-black bg-transparent text-white rounded-2xl p-2"
              name="email"
            />
            <br></br>
            <label className="w-full text-2xl font-razer">Password</label>
            <div className="flex w-full">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-20 border border-solid border-black bg-transparent text-white rounded-2xl p-2"
                name="password"
              />
            </div>
    
            <button className="w-full h-20 border border-solid border-black py-1.5 mt-2.5 rounded-2xl bg-green-400
            transition duration-150 ease hover:bg-black text-black hover:text-green-400 font-razer">
              Sign up
            </button>
    
            
            <Link href="/login" className="text-sm text-[#888] transition duration-150 ease hover:text-black">
              Already have an account? / Sign in
              </Link>
          </form>
    </section>
    )
}
