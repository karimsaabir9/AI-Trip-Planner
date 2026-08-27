"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserDetail } from "../Provider";
import { TripInfo } from "../create-new-trip/_components/ChatBox";
import MyTripCardItem from "./_components/MyTripCardItem";
import { Transcriptions } from "openai/resources/audio.mjs";

export type Trip = {
  tripId: any;
  tripDetail: TripInfo;
  _id: string;
};

function MyTrips() {
  const [myTrips, setMyTrips] = useState<Trip[]>([]);
  const { userDetail, setUserDetail } = useUserDetail();
  const convex = useConvex();

  useEffect(() => {
    userDetail && GetUserTrips();
  }, [userDetail]);

  const GetUserTrips = async () => {
    const result = await convex.query(api.tripDetail.GetUserTrips, {
      uid: userDetail?._id,
    });

    setMyTrips(result);
    console.log(result);
  };

  return (
    <div className="px-4 py-6 sm:px-10 sm:py-10 md:px-24 lg:px-48">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {myTrips.length === 0 && (
        <div className="p-7 border rounded-2xl flex flex-col items-center justify-center gap-5 mt-6">
          <h2>You don't have any trip plan created!</h2>

          <Link href="/create-new-trip">
            <Button>Create New Trip</Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {myTrips?.map((trip, index) => (
          <MyTripCardItem trip={trip} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
