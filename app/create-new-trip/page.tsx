"use client";
import { useState } from "react";
import ChatBox, { TripInfo } from "./_components/ChatBox";
import Itinerary from "./_components/Itinerary";


function CreateNewTrip() {
  const [tripPlan, setTripPlan] = useState<TripInfo>();
  const [showTrip, setShowTrip] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
      <div>
        <ChatBox
          onTripReady={setTripPlan}
          onViewTrip={() => setShowTrip(true)}
        />
      </div>
      <div className="col-span-2">
        <Itinerary />
      </div>
    </div>
  );
}

export default CreateNewTrip;
