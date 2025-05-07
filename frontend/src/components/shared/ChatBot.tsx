'use client';
import React, { useState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageSquare } from "lucide-react";

interface Message {
  text: string;
  sender: "bot" | "user";
}

const chatbotData = {
  welcomeMessage: "Welcome to Explore-India-View! How can I assist you today?",
  categories: [
    { name: "Trip Booking", key: "trip booking" },
    { name: "Transportation", key: "transportation" },
    { name: "Hotel Booking", key: "hotel booking" },
    { name: "Payments", key: "payment" },
    { name: "General Queries", key: "support" },
  ],
  responses: {
    tripBooking: {
      bookTour: "Please provide the destination, dates, and number of travelers to book your tour package.",
      checkDestinations: "Here are our top destinations: Rajasthan, Jaipur, Udaipur, Jaisalmer, and more.",
      modifyBooking: "Please share your booking ID and the changes you'd like to make.",
      cancelBooking: "Please provide your booking ID to proceed with the cancellation.",
    },
    transportation: {
      busBooking: "Please provide your travel dates and destination to check bus availability.",
      carRental: "We offer car rentals for city tours and intercity travel. Please share your requirements.",
      flightBooking: "Please provide your departure city, destination, and travel dates to book a flight.",
    },
    hotelBooking: {
      searchHotels: "Please provide the city and dates to search for hotels.",
      checkAvailability: "Please share the hotel name and dates to check availability.",
      modifyBooking: "Please provide your booking ID and the changes you'd like to make.",
      cancelBooking: "Please provide your booking ID to cancel your hotel reservation.",
    },
    payments: {
      checkStatus: "Please provide your booking ID to check the payment status.",
      makePayment: "You can make payments via credit card, debit card, or UPI. Please share your booking ID to proceed.",
      requestRefund: "Please provide your booking ID and reason for the refund request.",
      paymentIssues: "Please describe the issue you're facing with the payment.",
    },
    generalQueries: {
      contactSupport: "You can reach our customer support at +91 9588041628 or email us at exploreindiaview@gmail.com.",
      servicesInfo: "We offer tour packages, hotel bookings, car rentals, flight bookings, and event organization services.",
      feedback: "We value your feedback! Please share your suggestions or concerns.",
    },
  },
};

const ChatBotPopover: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: chatbotData.welcomeMessage, sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (query?: string) => {
    const userMessage = query || userInput.trim();
    if (userMessage) {
      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setUserInput("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
      }, 1000);
    }
  };

  const getBotResponse = (query: string): string => {
    const lowerCaseQuery = query.toLowerCase();

    if (lowerCaseQuery.includes("trip booking")) {
      return chatbotData.responses.tripBooking.bookTour;
    } else if (lowerCaseQuery.includes("destinations")) {
      return chatbotData.responses.tripBooking.checkDestinations;
    } else if (lowerCaseQuery.includes("modify booking")) {
      return chatbotData.responses.tripBooking.modifyBooking;
    } else if (lowerCaseQuery.includes("cancel booking")) {
      return chatbotData.responses.tripBooking.cancelBooking;
    } else if (lowerCaseQuery.includes("bus booking")) {
      return chatbotData.responses.transportation.busBooking;
    } else if (lowerCaseQuery.includes("car rental")) {
      return chatbotData.responses.transportation.carRental;
    } else if (lowerCaseQuery.includes("flight booking")) {
      return chatbotData.responses.transportation.flightBooking;
    } else if (lowerCaseQuery.includes("hotel booking")) {
      return chatbotData.responses.hotelBooking.searchHotels;
    } else if (lowerCaseQuery.includes("payment")) {
      return chatbotData.responses.payments.checkStatus;
    } else if (lowerCaseQuery.includes("support")) {
      return chatbotData.responses.generalQueries.contactSupport;
    } else if (lowerCaseQuery.includes("services")) {
      return chatbotData.responses.generalQueries.servicesInfo;
    } else if (lowerCaseQuery.includes("feedback")) {
      return chatbotData.responses.generalQueries.feedback;
    } else {
      return "I'm sorry, I didn't understand that. Can you please rephrase your query?";
    }
  };

  // Auto-scroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 z-50 right-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600">
            <MessageSquare className="w-6 h-6" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 shadow-lg">
          <div className="bg-white shadow-lg rounded-lg flex flex-col">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg">
              <h2 className="text-lg font-semibold">Explore India View Chatbot</h2>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                {chatbotData.categories.map((category) => (
                  <button
                    key={category.key}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300"
                    onClick={() => handleSend(category.key)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2" style={{ maxHeight: "300px" }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      msg.sender === "bot" ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleSend()}
              >
                Send
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatBotPopover;