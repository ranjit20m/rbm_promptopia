"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    // console.log(session);
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
            // console.log(res); 
        })();
    }, [])
    return (
        <nav className="flex-between w-full mb-16 pt-3">    
            {/* {session?.user? (<div>Create Post / Sign Out Code</div>):(<div>Sing In Code</div>)} */}
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg" width={30} height={30} alt="Promptopia logo" className="object-contain"  />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop navigation */}
            <div className="sm:flex hidden">            
                {session?.user? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">Create Post</Link>
                        <br />
                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                        <br />
                        <Link href="/profile">
                            <Image src={session?.user?.image} width={37} height={37} alt="Profile" className="rounded-full"  />
                        </Link>
                    </div>
                ) : (
                    <>
                    {/* {providers && <div>test - providers <button type="button" onClick={() => {signIn()}}>Sign In </button></div>} */}
                    
                        {providers && Object.values(providers).map((provider) => ( 
                            <button 
                                type="button" 
                                key={provider.name} 
                                className="black_btn"
                                onClick={() => {
                                    signIn(provider.id)
                                }}>
                                Sign In with {provider.name}
                            </button>
                        ))}                    
                    </>
                )}
            </div>

            {/* Mobile navigation */}
            <div className="sm:hidden flex relative">            
                {session?.user? (
                    <div className="flex">                        
                        <Image 
                            src={session?.user?.image} width={37} height={37} alt="Profile" className="rounded-full" 
                            onClick={() => setToggleDropdown((prev) => !prev)}  
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link 
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >       
                                    My Profile
                                </Link>
                                <Link 
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >       
                                    Create Prompt
                                </Link>
                                <button 
                                    type="button" 
                                    className="mt-5 w-full black_btn"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}  
                                >
                                    Sign Out
                                </button>
                             </div>   
                        )}
                    </div>
                ) : (
                    <>
                    {/* {providers && <div>test - providers <button type="button" onClick={() => {signIn()}}>Sign In </button></div>} */}
                    
                        {providers && Object.values(providers).map((provider) => ( 
                            <button 
                                type="button" 
                                key={provider.name} 
                                className="black_btn"
                                onClick={() => {
                                    signIn(provider.id)
                                }}>
                                Sign In with {provider.name}
                            </button>
                        ))}                    
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav;