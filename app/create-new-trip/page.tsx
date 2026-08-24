"use client";
import { useState } from "react";
import ChatBox, { TripInfo } from "./_components/ChatBox";
import TripDetails from "./_components/TripDetails";

function CreateNewTrip() {
  const [tripPlan, setTripPlan] = useState<TripInfo>();
  const [showTrip, setShowTrip] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
      <div>
        <ChatBox
          onTripReady={setTripPlan}
          onViewTrip={() => setShowTrip(true)}
        />
      </div>
      <div>
        {showTrip && tripPlan ? (
          <TripDetails trip={tripPlan} />
        ) : (
          <p className="text-gray-400">Map and Trip Plan to Display</p>
        )}
      </div>
    </div>
  );
}

export default CreateNewTrip;
