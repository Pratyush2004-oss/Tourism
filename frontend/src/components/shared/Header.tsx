import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="flex justify-between items-center py-5 px-6 border-b-2 max-w-7xl mx-auto">
      <div className="contents">
        <Link href={"/"} className="flex items-center gap-2">
          <h2 className="font-bold text-[2rem] sm:text-[2.5rem] lg:text-[3rem] bg-gradient-to-l from-white via-orange-400 to-orange-700 bg-clip-text">
            Explore India View
          </h2>
        </Link>
      </div>
      <div className="lg:flex items-center gap-10 hidden">
        <Link href={"/about"} className="text-2xl font-bold ">
          About
        </Link>
        <Link href={"/package"} className="text-2xl font-bold ">
          Package
        </Link>
        <Link href={"/hotels"} className="text-2xl font-bold ">
          Hotels
        </Link>
        <Link href={"/login"} className="text-2xl font-bold ">
          <Button className="text-2xl font-bold" variant={"outline"}>
            Login
          </Button>
        </Link>
      </div>
      <div className="lg:hidden block">
        <Sheet>
          <SheetTrigger className="cursor-pointer">
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-72">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold">
                Explore India View
              </SheetTitle>
              <div className="flex flex-col gap-5 mt-10 font-mono ">
                <Link href={"/about"} className="text-xl font-semibold">
                  About
                </Link>
                <Link href={"/package"} className="text-xl font-semibold ">
                  Package
                </Link>
                <Link href={"/hotels"} className="text-xl font-semibold ">
                  Hotels
                </Link>
                <Link href={"/login"}>
                  <Button
                    className="text-xl font-semibold cursor-pointer"
                    variant={"outline"}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Header;
