import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/store';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { data: session, status } = useSession();
  const store = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`bg-white shadow-md p-4 fixed top-0 w-full z-10 ${className}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Fitness Tracker
        </Link>

        <nav className="hidden md:flex space-x-6">
          {session && status === 'authenticated' ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-800 hover:text-blue-500"
              >
                Dashboard
              </Link>
              <Link
                href="/goals"
                className="text-gray-800 hover:text-blue-500"
              >
                Goals
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-800 hover:text-blue-500"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-gray-800 hover:text-blue-500"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={handleMenuToggle}
          className="md:hidden block focus:outline-none"
        >
          <svg
            className="h-6 w-6 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`md:hidden absolute top-12 right-4 z-10 bg-white rounded-md shadow-md w-48 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <nav className="p-4">
            {session && status === 'authenticated' ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-800 hover:text-blue-500 block mb-2"
                >
                  Dashboard
                </Link>
                <Link
                  href="/goals"
                  className="text-gray-800 hover:text-blue-500 block mb-2"
                >
                  Goals
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-blue-500 block mb-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-800 hover:text-blue-500 block mb-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;