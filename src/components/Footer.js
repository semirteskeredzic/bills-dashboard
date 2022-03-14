import React from 'react'

const Footer = () => {
    return(
        <div className="bg-white">
            <div className="sm:flex sm:flex-row h-[42rem] sm:h-[18rem]">
            <section className="w-full md:w-1/3 flex flex-column p-7">
                <span className="p-2">Information</span>
                <span className="p-2">News</span>
                <span className="p-2">Docs</span>
                <span className="p-2">Pricing</span>
            </section>
            <section className="w-full md:w-1/3 flex flex-column p-7">
                <span className="p-2">About Us</span>
                <span className="p-2">Support</span>
                <span className="p-2">FAQ</span>
            </section>
            <section className="w-full md:w-1/3 flex flex-column p-7">
                <span className="pb-4">Subscribe to our Newsletter</span>
                <input className="w-2/3 p-2 rounded-md bg-slate-200" type="email" placeholder='Enter your email here' />
                <button className="p-2 rounded-md text-white bg-blue-500 w-2/4 mt-3 hover:bg-blue-700">Subscribe</button>
            </section>
            </div>
            <div className="text-sm pb-1 text-gray-700 text-center">
                Copyright Atfee.co (c) {new Date().getFullYear()}
            </div>
        </div>
    )
}

export default Footer