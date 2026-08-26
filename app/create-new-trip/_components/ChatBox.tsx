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
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/Provider";
import { v4 as uuidv4 } from "uuid";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

const UI_TO_FIELD: Record<string, string> = {
  budget: "budget",
  groupsize: "group size",
  tripduration: "trip duration (number of days)",
};

function getAnsweredFields(msgs: Message[]): string[] {
  const answered = new Set<string>();
  msgs.forEach((m, i) => {
    if (m.role !== "assistant" || !m.ui) return;
    const field = UI_TO_FIELD[m.ui.toLowerCase()];
    if (!field) return;
    const hasLaterUserMsg = msgs.slice(i + 1).some((mm) => mm.role === "user");
    if (hasLaterUserMsg) answered.add(field);
  });
  return Array.from(answered);
}

export type TripInfo = {
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  hotels: Hotel[];
  itinerary: Itinerary[];
};

export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};


export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  }
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
}


export type Itinerary ={
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
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
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const { userDetail } = useUserDetail();
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail() || {};

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
    const updatedMessages = [...messages, newMsg];
    const result = await axios.post("/api/aimodel", {
      messages: updatedMessages,
      isFinal: useFinal,
      answeredFields: getAnsweredFields(updatedMessages),
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
      setTripDetailInfo?.(result?.data?.trip_plan);
      onTripReady?.(result?.data?.trip_plan);
      const tripId = uuidv4();
      await SaveTripDetail({
        tripDetail: result?.data?.trip_plan,
        tripId: tripId,
        uid: userDetail?._id,
      });
    }

    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string, index: number) => {
    const uiKey = ui?.toLowerCase();
    const field = UI_TO_FIELD[uiKey];
    if (field && getAnsweredFields(messages.slice(0, index)).includes(field)) {
      return null;
    }
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
          const generativeUi = RenderGenerativeUi(msg.ui ?? "", index);
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
