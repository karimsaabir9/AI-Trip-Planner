"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact us",
    path: "/contact-us",
  },
];

function Header() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = (
    user?.firstName ||
    user?.fullName ||
    user?.username ||
    "U"
  )
    .charAt(0)
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image src="/logo.svg" alt="logo" width={30} height={36} />
          <h2 className="font-bold text-xl sm:text-2xl">AI Trip Planner</h2>
        </div>

        {/* Menu Options */}
        <div className="hidden md:flex gap-8 items-center">
          {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>

        <div className="flex gap-5 items-center">
          <div className="hidden md:block">
            {!user ? (
              <SignInButton mode="modal">
                <Button>Get Started</Button>
              </SignInButton>
            ) : (
              <Link href={"/create-new-trip"}>
                <Button>Create New trip</Button>
              </Link>
            )}
          </div>

          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="w-9 h-9 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center hover:opacity-90 transition"
              >
                {initial}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg py-2 z-50">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-semibold flex items-center justify-center shrink-0">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {user?.fullName || user?.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>

                  <div className="border-t my-1">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        openUserProfile();
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Manage account
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            className="md:hidden p-2"
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {mobileNavOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileNavOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-2">
          {menuOptions.map((menu, index) => (
            <Link
              href={menu.path}
              key={index}
              onClick={() => setMobileNavOpen(false)}
            >
              <h2 className="text-lg hover:text-primary">{menu.name}</h2>
            </Link>
          ))}
          {!user ? (
            <SignInButton mode="modal">
              <Button className="w-full">Get Started</Button>
            </SignInButton>
          ) : (
            <Link
              href={"/create-new-trip"}
              onClick={() => setMobileNavOpen(false)}
            >
              <Button className="w-full">Create New trip</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
