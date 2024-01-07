"use client";
import Link from "next/link";
import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const searchRef = useRef(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSearch = (event) => {
    if (event.type === "click" && !searchRef.current.value.trim()) {
      return;
    }
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      const keyword = searchRef.current.value.trim();
      if (!keyword) {
        return;
      }
      if (keyword) {
        router.push(`/search/${keyword}`);
      }
    }
  };
  return (
    <header className="bg-zinc-900 py-3 gap-2 md:items-center px-3 md:px-8 text-white flex justify-between md:flex-row flex-col">
      <div className="flex justify-between  items-center">
        <Link href="/" className="text-xl font-bold">
          Keuangan<span className="text-blue-600 font-extrabold">Ku</span>
        </Link>
        <button
          className="bg-blue-600 text-white p-2 rounded-sm md:hidden "
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <List size={24} />}
          

          
        </button>
      </div>

      <nav className={`${open ? "block" : "hidden"} md:block`}>
        <ul
          className={` flex flex-col md:flex-row gap-4 md:items-center py-2 md:py-0`}
        >
          <li className="flex">
            <Link href="/" className="font-semibold text-lg w-full py-2 ">
              Beranda
            </Link>
          </li>
          <div className="input-group relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="p-2 pr-7 rounded w-full text-black"
              ref={searchRef}
              onKeyDown={handleSearch}
            />
            <button onClick={handleSearch} type="submit">
              <MagnifyingGlass
                size={24}
                className="absolute top-2 right-1 text-black"
              />
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
