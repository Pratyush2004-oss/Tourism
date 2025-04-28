"use client";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { CarouselImage } from "@/services/types";


export function Landing({IMAGES} : {IMAGES: CarouselImage[]}) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className=""
    >
      <CarouselContent className="">
        {IMAGES.map((image, idx) => (
          <CarouselItem key={idx}>
            <div className="w-full relative">
              <Card className="p-0">
                <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                  <div className="absolute top-1/2 text-white font-mono sm:text-2xl md:text-4xl text-center font-bold">
                    <p className="">Explore, Discover, Travel</p>
                    <p>{image.content}</p>
                    <Link href={"/"}>
                      <Button size={'lg'} className="md:text-xl mt-2 md:mt-5">Discover More</Button>
                    </Link>
                  </div>
                  <Image
                    src={image.image}
                    alt={image.content}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover aspect-video "
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
