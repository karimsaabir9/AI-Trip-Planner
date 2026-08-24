"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import SelectDaysUi from "./SelectDaysUi";
import FinalUi from "./FinalUi";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo ={
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  hotels: any;
  itinerary: any;
}

type ChatBoxProps = {
  onTripReady?: (trip: TripInfo) => void;
  onViewTrip?: () => void;
};

function ChatBox({ onTripReady, onViewTrip }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();

  const onSend = async (input?: string, finalOverride?: boolean) => {
    const text = input ?? userInput;
    if (!text?.trim()) return;
    const useFinal = finalOverride ?? isFinal;
    setLoading(true);
    setUserInput("");
    const newMsg: Message = {
      role: "user",
      content: text,
    };
    setMessages((prev: Message[]) => [...prev, newMsg]);
    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: useFinal,
    });
    console.log("Trip", result.data);
    !useFinal &&
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content: result?.data?.resp,
          ui: result?.data?.ui,
        },
      ]);

    if (useFinal) {
      setTripDetail(result?.data?.trip_plan);
      onTripReady?.(result?.data?.trip_plan);
    }

    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    const uiKey = ui?.toLowerCase();
    if (uiKey == "budget") {
      //Budget UI Component
      return <BudgetUi onSelectedOption={(v: string) => onSend(v)} />;
    } else if (uiKey == "groupsize") {
      //Group Size UI Component
      return <GroupSizeUi onSelectedOption={(v: string) => onSend(v)} />;
    } else if (uiKey == "tripduration") {
      //Trip Duration UI Component
      return <SelectDaysUi onSelectedOption={(v: string) => onSend(v)} />;
    } else if (uiKey == "final") {
      //Final Trip UI Component
      return <FinalUi viewTrip={() => onViewTrip?.()} disable={!tripDetail} />;
    }
    return null;
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui == "final") {
      setIsFinal(true);
      onSend("Ok, Great!", true);
    }
  }, [messages]);

  return (
    <div className="h-[85vh] flex flex-col">
      {messages?.length == 0 && (
        <EmptyBoxState onSelectOption={(v: string) => onSend(v)} />
      )}
      {/* Display Messages */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) => {
          if (msg.role == "user") {
            return (
              <div key={index} className="flex justify-end mt-2">
                <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                  {msg.content}
                </div>
              </div>
            );
          }
          const generativeUi = RenderGenerativeUi(msg.ui ?? "");
          return (
            <div key={index} className="flex justify-start mt-2">
              <div
                className={`${generativeUi ? "w-full" : ""} max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg`}
              >
                {msg.content}
                {generativeUi}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </section>
      {/* User Input */}
      <section>
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          <Button
            size={"icon"}
            className="absolute bottom-6 right-6"
            onClick={() => onSend()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
