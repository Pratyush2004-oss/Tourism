"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
function SignIn() {
  const [input, setinput] = useState({
    name: "",
    username: "",
    isoCode: "",
    mobile: "",
    password: "",
  });
  const [loading, setloading] = useState<boolean>(false);
  const countries = getCountries();

  const handleCountryChange = (country: any) => {
    if (country) {
      setinput({ ...input, isoCode: `+${getCountryCallingCode(country)}` });
    } else {
      setinput({ ...input, isoCode: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ ...input });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-7rem)] bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-sm ">
        <h1 className="text-3xl font-bold mb-4 text-center border-b-4 border-blue-100">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          {/* Name */}
          <div className="mb-4 flex flex-col gap-1">
            <Label className="text-sm ml-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter Name"
              value={input.name}
              onChange={(e) => setinput({ ...input, name: e.target.value })}
            />
          </div>
          {/* UserName */}
          <div className="mb-4 flex flex-col gap-1">
            <Label className="text-sm ml-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Username
            </Label>
            <Input
              type="text"
              required
              pattern="^[a-zA-Z0-9_]{3,15}$"
              title="Username must be 3-15 characters long and can only contain letters, numbers, and underscores"
              placeholder="Enter Username"
              value={input.username}
              onChange={(e) => setinput({ ...input, username: e.target.value })}
            />
          </div>
          {/* Mobile */}
          <div className="mb-4 flex flex-col gap-1">
            <Label className="text-sm ml-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mobile
            </Label>
            <div className="flex items-center gap-1">
              <Select onValueChange={(value) => handleCountryChange(value)}>
                <SelectTrigger className="w-[90px]">
                  <SelectValue placeholder="Select ISO code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country Code</SelectLabel>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country} (+{getCountryCallingCode(country)})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="text"
                pattern="\d{10}"
                title="Please enter a valid 10-digit mobile number"
                required
                value={input.mobile}
                onChange={(e) => setinput({ ...input, mobile: e.target.value })}
                placeholder="Enter Mobile Number"
              />
            </div>
          </div>
          {/* Password */}
          <div className="mb-4 flex flex-col gap-1">
            <Label className="text-sm ml-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </Label>
            <Input
              type="password"
              required
              pattern=".{8,}"
              title="Password must be at least 8 characters long"
              value={input.password}
              onChange={(e) => setinput({ ...input, password: e.target.value })}
              placeholder="Enter Password"
            />
          </div>
          <Button className="flex items-center gap-1 justify-center w-full mt-4 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer">
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                Continue <ArrowRight />
              </>
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
