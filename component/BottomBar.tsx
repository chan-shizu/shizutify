"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconContext } from "react-icons";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { RiSearchFill } from "react-icons/ri";

export const BottomBar = () => {
  const pathName = usePathname();
  return (
    <nav className="font-sans text-white w-full ">
      <ul className="w-full flex">
        <li className="w-full text-center h-full">
          <Link href="/home" className=" flex flex-col justify-between h-full">
            <div className="flex justify-center">
              {pathName === "/home" ? (
                <IconContext.Provider value={{ size: "35px", color: "white" }}>
                  <GoHomeFill />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: "35px", color: "gray" }}>
                  <GoHome />
                </IconContext.Provider>
              )}
            </div>
            <p>ホーム</p>
          </Link>
        </li>
        <li className="w-full text-center  ">
          <Link
            href="/search"
            className=" flex flex-col justify-between h-full"
          >
            <div className="flex justify-center h-full">
              {pathName === "/search" ? (
                <IconContext.Provider value={{ size: "30px", color: "white" }}>
                  <RiSearchFill />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: "30px", color: "gray" }}>
                  <FaSearch />
                </IconContext.Provider>
              )}
            </div>
            <p>検索</p>
          </Link>
        </li>
        <li className="w-full text-center h-full">
          <Link
            href="favorite"
            className=" flex flex-col justify-between h-full"
          >
            <div className="flex justify-center">
              {pathName === "/favorite" ? (
                <IconContext.Provider value={{ size: "35px", color: "white" }}>
                  <IoMdHeart />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: "35px", color: "gray" }}>
                  <FaRegHeart />
                </IconContext.Provider>
              )}
            </div>
            <p>お気に入り</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
