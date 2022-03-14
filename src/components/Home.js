import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div className="w-full h-[18rem] md:h-[32rem]">
            <div className="flex flex-row place-content-around">
                <section className="px-10 md:px-12 pt-[6rem] md:pt-[9rem] lg:pt-[11rem]">
                    <h2 className=" text-left text-[22px] md:text-[52px] lg:text-[72px]">Track your utility bills</h2>
                    <h2 className="text-left text-[22px] md:text-[52px] lg:text-[72px]">when they arrive.</h2>
                </section>
                <section className="self-center w-2/5  md:w-1/5">
                    <div className="text-center pt-[6rem] md:pt-[10rem] lg:pt-[12rem]">
                        <Link className="shadow-md m-0 m-auto w-2/3 block p-3 text-center text-white bg-blue-500 hover:bg-blue-600 no-underline rounded-3xl tracking-wide" to="/register">Sign Up</Link>
                        <span className=" m-0 m-auto pt-5 text-xs text-center">Have an account? <Link className="no-underline drop-shadow-lg text-blue-300" to="/login">Login</Link></span>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home