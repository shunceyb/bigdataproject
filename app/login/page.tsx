"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image'
import Razer from '@/app/images/background.png'
import { ArrowLeft } from 'lucide-react'

const Login = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: false,
        });
        if (res?.error) {
          setError(res.error as string);
        }
        if (res?.ok) {
          return router.push("/");
        }
    };
    return (
        <section className="w-full h-screen flex items-center justify-center bg-black gap-40">
            <Image src={Razer} width={500} height={500} alt="logo"/>
          <form
            className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
           bg-transparent text-green-400"
            onSubmit={handleSubmit}>
            {error && <div className="text-red-400">{error}</div>}
            <div className="flex gap-2">
            <Link href="/"><ArrowLeft size={50} className=""/></Link>
            <h1 className="mb-5 w-full text-4xl font-bold text-center font-razer">Sign In</h1>
            </div>
            <label className="w-full text-2xl gap-2 font-razer">Email</label>
            <br></br>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-20 border border-solid border-black bg-transparent text-white rounded-2xl p-2 "
              name="email" />
              <br></br>
            <label className="w-full text-2xl font-razer">Password</label>
            <br ></br>
            <div className="flex w-full">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-20 border border-solid border-black bg-transparent text-white rounded-2xl p-2"
                name="password" />
            </div>
            <br></br>
            <button className="w-full  h-20 border border-solid border-black  bg-green-400
            transition duration-150 ease hover:bg-black text-black hover:text-green-400 rounded-2xl font-razer">
              Sign In
            </button>
    
            <Link
              href="/register"
              className="text-sm text-[#888] transition duration-150 ease hover:text-black">
              Don't have an account? / Register
            </Link>
          </form>
        </section>
    );
};

export default Login