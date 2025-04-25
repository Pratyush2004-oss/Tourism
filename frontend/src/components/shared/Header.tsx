import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
        <h2 className="font-bold text-[2rem] sm:text-[2.5rem] lg:text-[3rem] bg-gradient-to-l from-white via-orange-400 to-orange-700 bg-clip-text">Explore India View</h2>
      </div>
      <div className="lg:flex items-center gap-10 hidden">
        <Link href={"/"} className="text-2xl font-bold ">
          About
        </Link>
        <Link href={"/"} className="text-2xl font-bold ">
          Package
        </Link>
        <Link href={"/"} className="text-2xl font-bold ">
          Hotels
        </Link>
        <Link href={"/"} className="text-2xl font-bold ">
          <Button className="text-2xl font-bold" variant={'outline'}>Login</Button>
        </Link>   
      </div>
      <div className="lg:hidden block">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-72">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Header;
