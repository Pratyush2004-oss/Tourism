import {
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  MapPlus,
  MessageCircle,
  PhoneCall,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-[url(https://img.freepik.com/free-photo/abstract-wave-cyan-color-black-background_1268-28760.jpg?t=st=1706202170~exp=1706205770~hmac=c064fc4e73ad1a1e01a1f0782257b32e7a155abf6f8c97fe918c827d1c953e32&w=1060)] p-5  text-white bg-no-repeat bg-cover">
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Quick Links */}
        <div className="p-3">
          <h1 className="text-xl font-bold font-serif">Quick Links</h1>
          <div className="font-mono text-sm mt-2">
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <ChevronRight
                size={15}
                className="text-purple-800"
                strokeWidth={5}
              />
              Home
            </Link>
            <Link
              href={"/about"}
              className="flex items-center gap-1 hover:gap-3 transition-all duration-300"
            >
              <ChevronRight
                size={15}
                className="text-purple-800"
                strokeWidth={5}
              />
              About
            </Link>
            <Link
              href={"/package"}
              className="flex items-center gap-1 hover:gap-3 transition-all duration-300"
            >
              <ChevronRight
                size={15}
                className="text-purple-800"
                strokeWidth={5}
              />
              Package
            </Link>
            <Link
              href={"/hotels"}
              className="flex items-center gap-1 hover:gap-3 transition-all duration-300"
            >
              <ChevronRight
                size={15}
                className="text-purple-800"
                strokeWidth={5}
              />
              Hotels
            </Link>
            <Link
              href={"/privacy-policy"}
              className="flex items-center gap-1 hover:gap-3 transition-all duration-300"
            >
              <ChevronRight
                size={15}
                className="text-purple-800"
                strokeWidth={5}
              />
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-3">
          <h1 className="text-xl font-bold font-serif">Contact Information</h1>
          <div className="text-sm font-mono mt-2">
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <PhoneCall
                size={15}
                className="fill-purple-700 text-purple-600"
              />
              +91 9588041628
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <PhoneCall
                size={15}
                className="fill-purple-700 text-purple-600"
              />
              +91 8209598333
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <PhoneCall
                size={15}
                className="fill-purple-700 text-purple-600"
              />
              +91 8426090454
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <Mail size={15} className="fill-purple-700 text-white" />
              exploreindiaview@gmail.com
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <MapPlus size={15} className="fill-purple-700 text-purple-600" />
              Rajasthan, India-302012
            </Link>
          </div>
        </div>

        {/* Follow Us */}
        <div className="p-3">
          <h1 className="text-xl font-bold font-serif">Contact Information</h1>
          <div className="text-sm font-mono mt-2">
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <Facebook size={15} className="fill-purple-700 text-purple-600" />
              Facebook
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <Twitter size={15} className="fill-purple-700 text-purple-600" />
              Twitter
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <Youtube size={15} className="fill-purple-700 text-purple-600" />
              Youtube
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-2 hover:gap-5 transition-all duration-300"
            >
              <Instagram size={15} className="fill-purple-700 " />
              Instagram
            </Link>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="font-serif text-sm">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Incredible Tour To India. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
