"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DoorOpen, Menu } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Header() {
  const { user, logout, token } = useAuthStore();
  return (
    <div className="flex justify-between items-center py-5 px-6 border-b-2 max-w-7xl mx-auto">
      <div className="contents">
        <Link href={"/"} className="flex items-center gap-2">
          <h2 className="font-bold text-[1.5rem] sm:text-[2rem] lg:text-[2.3rem] bg-gradient-to-l from-white via-orange-400 to-orange-700 bg-clip-text">
            Explore India View
          </h2>
        </Link>
      </div>

      {/* Desktop View */}
      <div className="lg:flex items-center gap-10 hidden">
        <Link href={"/about"} className="text-xl font-bold ">
          About
        </Link>
        <Link href={"/package"} className="text-xl font-bold ">
          Package
        </Link>
        <Link href={"/hotels"} className="text-xl font-bold ">
          Hotels
        </Link>
        {user && token ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar className="size-10">
                <AvatarImage src="/images/user-profile.png" />
                <AvatarFallback>
                  {user.fullname[0] + user.fullname.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center gap-2 px-3 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/images/user-profile.png" />
                  <AvatarFallback>
                    {user.fullname[0] + user.fullname.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-lg font-semibold">{user.fullname}</span>
              </div>
              <DropdownMenuLabel className="font-bold text-lg">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-bold text-lg">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold text-lg">
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="text-red-600 font-bold text-lg flex items-center gap-2"
              >
                Logout <DoorOpen className="size-4" color="red" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href={"/login"}
              className="text-xl font-semibold cursor-pointer underline underline-offset-1 text-blue-500"
            >
              Login
            </Link>
            <Link
              href={"/signup"}
              className="text-xl font-semibold cursor-pointer underline underline-offset-2 text-blue-500"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden block">
        <Sheet>
          <SheetTrigger className="cursor-pointer">
            {user ? (
              <Avatar className="size-10">
                <AvatarImage src="/images/user-profile.png" />
                <AvatarFallback>
                  {user.fullname[0] + user.fullname.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Menu />
            )}
          </SheetTrigger>
          <SheetContent className="w-72">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold">
                Explore India View
              </SheetTitle>
              <div className="flex flex-col gap-5 mt-10 font-mono ">
                {user && token && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <div className="flex items-center gap-2 px-3 py-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/images/user-profile.png" />
                          <AvatarFallback>
                            {user.fullname[0] + user.fullname.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-lg font-semibold">
                          {user.fullname}
                        </span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel className="font-bold text-lg">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="font-bold text-lg">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="font-bold text-lg">
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-red-600 font-bold text-lg flex items-center gap-2"
                      >
                        Logout <DoorOpen className="size-4" color="red" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <Link href={"/about"} className="text-xl font-semibold">
                  About
                </Link>
                <Link href={"/package"} className="text-xl font-semibold ">
                  Package
                </Link>
                <Link href={"/hotels"} className="text-xl font-semibold ">
                  Hotels
                </Link>
                {!user && !token && (
                  <>
                    <Link
                      href={"/login"}
                      className="text-xl font-semibold cursor-pointer underline underline-offset-1 text-blue-500"
                    >
                      Login
                    </Link>
                    <Link
                      href={"/signup"}
                      className="text-xl font-semibold cursor-pointer underline underline-offset-2 text-blue-500"
                    >
                      Sign-Up
                    </Link>
                  </>
                )}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Header;
