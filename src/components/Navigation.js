import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from '../Images/AtfeeLogo.png'
import Userfront from '@userfront/react'

const Navigation = ({logout, login, signup}) => {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const sidebarRef = useRef()
    const linkRef = useRef()

    function useOnClickOutside(ref, handler) {
        useEffect(
          () => {
            const listener = (event) => {
              // Do nothing if clicking ref's element or descendent elements
              if (!ref.current || ref.current.contains(event.target)) {
                return;
              }
              handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
              document.removeEventListener("mousedown", listener);
              document.removeEventListener("touchstart", listener);
            };
          },[ref, handler])
        }

    useOnClickOutside(sidebarRef, () => setIsOpen(false))
    useOnClickOutside(linkRef, () => setIsOpen(false))

    const openSidebar = () => {
        setIsOpen(!isOpen)
    }

    const signUpUser = () => {
      signup() 
      setIsOpen(false)
    }

    const goHome = () => {
      setIsOpen(false)
      navigate('/')
    }

    return (<>
        <section className={`${isOpen ? 'w-full h-full' : 'w-0 h-0'} t-0 absolute flex z-10 bg-slate-600 bg-opacity-50`}></section>
        <nav className="p-2 flex w-full justify-end md:justify-between bg-white shadow-sm">
          {Userfront.tokens.accessToken ? 
            <>
            <section className="hidden md:block self-center">
                <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500 h-" to="/dashboard"><img className="w-32 mt-0 inline-block" src={logo} alt="logo" /></Link>
                <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/paidbills">Paid Bills</Link>
                <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/unpaidbills">Unpaid Bills</Link>
            </section>
            <section className="order-last hidden md:block self-center">
              <div className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500">{logout}</div>
            </section>
            </>
            :
            <>
            <section className="hidden md:block self-center">
            <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/"><img className="w-32 mt-0 inline-block" src={logo} alt="logo" /></Link>
            </section>
            <section className="order-last hidden md:block">
            <button className="bg-transparent text-md text-blue my-1 py-2 px-4" onClick={() => signup()}>Sign Up</button>
              <button className="bg-blue-500 shadow-md rounded hover:bg-blue-600 text-md text-white my-1 py-2 px-4" onClick={() => login()}>Login</button>
            </section>
            </>
            }
            <Link className="m-0 m-auto p-2 no-underline text-gray-700 hover:text-blue-500 md:hidden" to="/"><img className="w-25 mt-0 inline-block" src={logo} alt="logo" /></Link>
            <button className="md:hidden order-last flex self-center" onClick={openSidebar}>
                <MenuIcon className="h-7 w-7 text-blue-500" />
            </button>
            <section ref={sidebarRef} className={`flex flex-col h-full md:hidden ${isOpen ? 'w-80' : 'w-0'} shadow-lg fixed z-20 top-0 right-0 bg-white overflow-x-hidden duration-500`}>
                <button onClick={openSidebar} className="t-0 l-2 r-0 pb-11 mt-2 ml-3"><XIcon className="h-8 w-8 float-left text-blue-500" /></button>
                {Userfront.tokens.accessToken ?
                  <>
                    <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/dashboard"><img className="w-52 mt-0 mb-5 inline-block" src={logo} alt="logo" /></Link>
                    <Link ref={linkRef} className="mx-5 p-2 no-underline text-blue hover:text-darken text-center text-xl" onClick={() => setIsOpen(false)} to="/dashboard">Dashboard</Link>
                    <Link ref={linkRef} className="mx-5 p-2 no-underline text-blue hover:text-darken text-center text-xl" onClick={() => setIsOpen(false)}  to="/unpaidbills">Unpaid Bills</Link>
                    <Link ref={linkRef} className="mx-5 p-2 no-underline text-blue hover:text-darken text-center text-xl" onClick={() => setIsOpen(false)}  to="/paidbills">Paid Bills</Link>
                    
                    <hr className="h-50 bg-transparent mb-0" />
                    <hr />
                    <div className="bg-transparent text-blue my-1 w-full text-base text-center">{logout}</div>
                  </>
                  :
                  <>
                    <Link ref={linkRef} className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" onClick={() =>  goHome()} to="/">Home</Link>
                    <hr className="h-50 bg-transparent" />
                    <hr />
                    <button ref={linkRef} className="bg-blue-500 shadow-md rounded hover:bg-blue-600 text-md text-white mx-5 my-1 py-2 px-4" onClick={() => login()}>Login</button>
                    <button ref={linkRef} className="bg-transparent text-md text-blue mx-5 my-1 py-2 px-4" onClick={() => signUpUser()}>Sign Up</button>
                  </>
                }
            </section>
        </nav>
        </>
    )
}

export default Navigation