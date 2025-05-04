"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth.store";
import { BookImage, MessageCircleQuestionIcon } from "lucide-react";
import Image from "next/image";
import BookingTable from "./_components/BookingTable";
import QueriesTable from "./_components/QueriesTable";


function AdminPage() {
  const { isAdmin, token } = useAuthStore();
  
  if (!isAdmin)
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <Image
          src={"/images/logo.png"}
          width={200}
          height={200}
          alt={"logo"}
          className="mb-5 animate-bounce"
        />
        <h1 className="text-xl md:text-2xl mb-5 font-bold text-center text-red-400 font-mono">
          Unauthorized
        </h1>
      </div>
    );
  return (
    <div className="container px-3 mx-auto flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
      <Tabs defaultValue="Bookings" className="w-full mt-5">
        <TabsList className="mx-auto">
          <TabsTrigger value={"Bookings"}>
            <BookImage/>
            Bookings
          </TabsTrigger>
          <TabsTrigger value={"Queries"}>
            <MessageCircleQuestionIcon/>
            Queries</TabsTrigger>
        </TabsList>
        <TabsContent value="Bookings" className="h-[calc(100vh-10rem)] w-full">
          <BookingTable token={token || ""} />
        </TabsContent>
        <TabsContent value="Queries" className="h-[calc(100vh-10rem)] w-full">
          <QueriesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminPage;
