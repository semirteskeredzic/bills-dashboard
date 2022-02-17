import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useNavigate } from "react-router-dom"

const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('user')
        if(userLoggedIn !== null) setLoggedIn(true)

        return() => {
          setLoggedIn(() => false)
        }
    },[loggedIn])

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
          },
          // Add ref and handler to effect dependencies
          // It's worth noting that because the passed-in handler is a new ...
          // ... function on every render that will cause this effect ...
          // ... callback/cleanup to run every render. It's not a big deal ...
          // ... but to optimize you can wrap handler in useCallback before ...
          // ... passing it into this hook.
          [ref, handler]
        );
      }

    useOnClickOutside(sidebarRef, () => setIsOpen(false))
    useOnClickOutside(linkRef, () => setIsOpen(false))

    const openSidebar = () => {
        setIsOpen(!isOpen)
    }

    const logOut = () => {
      localStorage.removeItem('user')
      navigate('/')
    }

    return (
        <nav className="bg-gray-300 p-4 flex w-full justify-end md:justify-between">
            <section className="hidden md:block">
                <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/">Home</Link>
                <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/paidbills">Paid Bills</Link>
                <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/unpaidbills">Unpaid Bills</Link>
            </section>
            {loggedIn ? 
            <section className="order-last hidden md:block">
              <button className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" onClick={() => logOut()}>
                <LogoutIcon className="h-7 w-7" />
              </button>
            </section>
            :
            <section className="order-last hidden md:block">
              <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/login">Login</Link>
              <Link className="mx-5  p-2 no-underline text-gray-700 hover:text-blue-500" to="/register">Register</Link>
            </section>
            }
            <button className="md:hidden order-last flex" onClick={openSidebar}>
                {isOpen ? <XIcon className="h-7 w-7 text-blue-500" /> :
                <MenuIcon className="h-7 w-7 text-blue-500" />}
                </button>
            <section ref={sidebarRef} className={`flex flex-col h-full md:hidden ${isOpen ? 'w-60' : 'w-0'} fixed z-1 top-0 left-0 bg-slate-600 overflow-x-hidden duration-500`}>
                <button onClick={openSidebar} className="t-0 r-0 pb-20 mt-3 mr-3"><XIcon className="h-8 w-8 float-right text-blue-200" /></button>
                <Link ref={linkRef} className="mx-5  p-2 no-underline text-gray-200 hover:text-indigo-200" to="/">Home</Link>
                <Link ref={linkRef} className="mx-5  p-2 no-underline text-gray-200 hover:text-indigo-200" to="/paidbills">Paid Bills</Link>
                <Link ref={linkRef} className="mx-5  p-2 no-underline text-gray-200 hover:text-indigo-200" to="/unpaidbills">Unpaid Bills</Link>
                <hr />
                <Link ref={linkRef} className="mx-5  p-2 no-underline text-gray-200  hover:text-indigo-200" to="/login">Login</Link>
                <Link ref={linkRef} className="mx-5  p-2 no-underline text-gray-200 hover:text-indigo-200" to="/register">Register</Link>
            </section>
        </nav>
    )
}

export default Navigation