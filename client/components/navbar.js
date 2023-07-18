import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Navbar = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      setToken(token)
    }
  }, []);
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('customerId')
    setToken(undefined)
    router.push('/')
  };

  return (
    <nav className="bg-dark py-5">
      <div className="container mx-auto px-4">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/">
              <button className="text-white text-sm font-bold sm:text-2xl">
              Proxima
              </button>
            </Link>
          </li>
          <li className="flex items-center">
            {token ? (
              <>
                <button
                  className="text-primary text-sm  bg-secondary font-bold sm:text-sm ml-4 border border-white rounded-lg px-3 py-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="text-dark bg-white inline-block rounded-full pb-1 px-3 text-sm font-bold sm:text-1.5xl">
                  Login
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
