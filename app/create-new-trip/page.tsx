"use client";
import { useState } from "react";
import ChatBox, { TripInfo } from "./_components/ChatBox";
import Itinerary from "./_components/Itinerary";
import GlobalMap from "./_components/GlobalMap";
import { Button } from "@/components/ui/button";
import { Globe2, Plane } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CreateNewTrip() {
  const [tripPlan, setTripPlan] = useState<TripInfo>();
  const [showTrip, setShowTrip] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-10">
      <div>
        <ChatBox
          onTripReady={setTripPlan}
          onViewTrip={() => setShowTrip(true)}
        />
      </div>
      <div className="col-span-2 relative">
        {activeIndex == 0 ? <Itinerary /> : <GlobalMap />}

        <Tooltip>
          <TooltipTrigger className="absolute bg-black  bottom-10 left-[50%] rounded-2xl">
            <Button
              size={"lg"} className='bg-black hover:bg-gray-700'
              onClick={() => setActiveIndex(activeIndex == 0 ? 1 : 0)}
            >
              {activeIndex == 0 ? <Plane /> : <Globe2 />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Switch Between Map and Trip</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default CreateNewTrip;
