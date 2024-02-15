"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconContext } from "react-icons";
import { BsEnvelopePaper, BsEnvelopePaperFill } from "react-icons/bs";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { RiSearchFill } from "react-icons/ri";

export const BottomBar = () => {
  const pathName = usePathname();
  return (
    <nav className="font-sans text-white w-full text-sm fixed bottom-0 left-0 w-full opacity-90 bg-black py-3">
      <ul className="w-full flex">
        <li className="w-full text-center h-[54px]">
          <Link href="/home" className=" flex flex-col justify-between h-full">
            <div className="flex justify-center">
              {pathName === "/home" ? (
                <IconContext.Provider value={{ size: "30px", color: "white" }}>
                  <GoHomeFill />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: "30px", color: "gray" }}>
                  <GoHome />
                </IconContext.Provider>
              )}
            </div>
            <p>ホーム</p>
          </Link>
        </li>
        <li className="w-full text-center h-[54px]">
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
        <li className="w-full text-center h-[54px]">
          <Link
            href="favorite"
            className=" flex flex-col justify-between h-full"
          >
            <div className="flex justify-center">
              {pathName === "/favorite" ? (
                <IconContext.Provider value={{ size: "30px", color: "white" }}>
                  <IoMdHeart />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: "30px", color: "gray" }}>
                  <FaRegHeart />
                </IconContext.Provider>
              )}
            </div>
            <p>お気に入り</p>
          </Link>
        </li>
        <li className="w-full text-center h-[54px]">
          <Link
            href="request"
            className=" flex flex-col justify-between h-full"
          >
            <div className="flex justify-center">
              {pathName === "/request" ? (
                <IconContext.Provider value={{ size: "25px", color: "white" }}>
                  <BsEnvelopePaperFill />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: "25px", color: "gray" }}>
                  <BsEnvelopePaper />
                </IconContext.Provider>
              )}
            </div>
            <p>リクエスト</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
