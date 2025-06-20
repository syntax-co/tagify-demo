import Link from "next/link";
import { Menu, UserCircle } from "lucide-react";
import { useAppContext } from "../../context/app-context";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 bg-card dark:bg-background border-b border-border">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-[#FF312E] to-[#3C3C67] text-transparent bg-clip-text"
        >
          <div className="h-16 aspect-square
          bg-center bg-contain"
          style={{
            backgroundImage:'url(./images/icon.png)'
          }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-black dark:hover:text-white transition">
            Features
          </Link>
          <Link href="" className="text-sm text-muted-foreground hover:text-black dark:hover:text-white transition">
            Pricing
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-0 h-auto bg-transparent"
              >
                <UserCircle className="h-6 w-6 text-muted-foreground" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => alert('Log out logic here')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin">
              <button className="bg-[#FF312E] text-white px-5 py-1.5 text-sm rounded-xl hover:opacity-90 transition">
                Sign In
              </button>
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <Menu className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
