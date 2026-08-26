"use client";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import { Clock, ExternalLink, Star, Ticket, Timer, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/Provider";
import { useEffect, useState } from "react";
import { TripInfo } from "./ChatBox";

// const TRIP_DATA = {
//   budget: "Moderate",
//   destination: "Pune",
//   duration: "3 Days",
//   group_size: "Family (3 to 5 people)",
//   hotels: [
//     {
//       description:
//         "A comfortable mid-range hotel near Pune Railway Station and Bund Garden, suitable for families looking for easy access to the city center and cultural attractions.",
//       geo_coordinates: {
//         latitude: 18.5282,
//         longitude: 73.8757,
//       },
//       hotel_address:
//         "18, Cannaught Road, Bund Garden, Pune, Maharashtra 411001, India",
//       hotel_image_url:
//         "https://example.com/images/the-central-park-hotel-pune.jpg",
//       hotel_name: "The Central Park Hotel",
//       price_per_night: "INR 4,500 - 6,500",
//       rating: 4.2,
//     },
//     {
//       description:
//         "A well-known family-friendly hotel in the heart of Pune, offering clean rooms, excellent vegetarian dining, and convenient access to cultural landmarks.",
//       geo_coordinates: {
//         latitude: 18.5167,
//         longitude: 73.8433,
//       },
//       hotel_address:
//         "1242 B, Apte Road, Deccan Gymkhana, Pune, Maharashtra 411004, India",
//       hotel_image_url: "https://example.com/images/hotel-shreyas-pune.jpg",
//       hotel_name: "Hotel Shreyas",
//       price_per_night: "INR 3,800 - 5,500",
//       rating: 4.4,
//     },
//   ],
//   itinerary: [
//     {
//       activities: [
//         {
//           best_time_to_visit: "8:00 AM - 10:30 AM",
//           geo_coordinates: {
//             latitude: 18.5196,
//             longitude: 73.8553,
//           },
//           place_address: "Shaniwar Peth, Pune, Maharashtra 411030, India",
//           place_details:
//             "A historic fortification and one of Pune's most iconic heritage sites, known for Maratha history and architecture.",
//           place_image_url: "https://example.com/images/shaniwar-wada.jpg",
//           place_name: "Shaniwar Wada",
//           ticket_pricing:
//             "INR 25 for Indian citizens, INR 300 for foreign tourists",
//           time_travel_each_location:
//             "Approx. 20-30 minutes from central Pune hotels",
//         },
//         {
//           best_time_to_visit: "10:45 AM - 12:00 PM",
//           geo_coordinates: {
//             latitude: 18.516,
//             longitude: 73.8566,
//           },
//           place_address: "Pune, Maharashtra 411030, India",
//           place_details:
//             "A famous red palace associated with Chhatrapati Shivaji Maharaj, featuring historical exhibits and a cultural connection to Pune.",
//           place_image_url: "https://example.com/images/lal-mahal-pune.jpg",
//           place_name: "Lal Mahal",
//           ticket_pricing: "INR 10 - 20 per person",
//           time_travel_each_location: "Approx. 5-10 minutes from Shaniwar Wada",
//         },
//         {
//           best_time_to_visit: "12:15 PM - 1:00 PM",
//           geo_coordinates: {
//             latitude: 18.5165,
//             longitude: 73.855,
//           },
//           place_address: "Budhwar Peth, Pune, Maharashtra 411002, India",
//           place_details:
//             "One of Pune's most revered temples, known for its beautiful idol and cultural significance.",
//           place_image_url:
//             "https://example.com/images/dagdusheth-ganpati-temple.jpg",
//           place_name: "Dagdusheth Halwai Ganpati Temple",
//           ticket_pricing: "Free entry",
//           time_travel_each_location: "Approx. 5 minutes from Lal Mahal",
//         },
//         {
//           best_time_to_visit: "2:00 PM - 4:30 PM",
//           geo_coordinates: {
//             latitude: 18.5145,
//             longitude: 73.8564,
//           },
//           place_address:
//             "1377-78, Natu Baug, Off Bajirao Road, Pune, Maharashtra 411002, India",
//           place_details:
//             "A treasure trove of Indian artifacts, musical instruments, household items, and art from across centuries.",
//           place_image_url:
//             "https://example.com/images/raja-dinkar-kelkar-museum.jpg",
//           place_name: "Raja Dinkar Kelkar Museum",
//           ticket_pricing:
//             "INR 50 for Indian citizens, INR 200 for foreign tourists",
//           time_travel_each_location:
//             "Approx. 10 minutes from Dagdusheth Temple",
//         },
//       ],
//       best_time_to_visit_day:
//         "Morning to evening, with heritage visits best before 11:00 AM and evening strolls after 5:00 PM.",
//       day: 1,
//       day_plan:
//         "Arrival from Mumbai, check-in to hotel, and explore Pune's historic and cultural heart with a relaxed city tour.",
//     },
//     {
//       activities: [
//         {
//           best_time_to_visit: "9:00 AM - 11:00 AM",
//           geo_coordinates: {
//             latitude: 18.5148,
//             longitude: 73.8557,
//           },
//           place_address:
//             "Tulsi Baug, Budhwar Peth, Pune, Maharashtra 411002, India",
//           place_details:
//             "A bustling traditional market in old Pune, ideal for shopping for souvenirs, textiles, and local items.",
//           place_image_url: "https://example.com/images/tulsi-baug-market.jpg",
//           place_name: "Tulsi Baug",
//           ticket_pricing: "Free entry; shopping costs vary",
//           time_travel_each_location:
//             "Approx. 15-20 minutes from most central hotels",
//         },
//         {
//           best_time_to_visit: "11:15 AM - 12:45 PM",
//           geo_coordinates: {
//             latitude: 18.4934,
//             longitude: 73.8399,
//           },
//           place_address: "Parvati Paytha, Pune, Maharashtra 411009, India",
//           place_details:
//             "A scenic and spiritual spot offering panoramic views of Pune and a peaceful temple complex.",
//           place_image_url: "https://example.com/images/parvati-hill-temple.jpg",
//           place_name: "Parvati Hill and Temple",
//           ticket_pricing: "Free entry",
//           time_travel_each_location: "Approx. 20-30 minutes from Tulsi Baug",
//         },
//         {
//           best_time_to_visit: "1:30 PM - 3:00 PM",
//           geo_coordinates: {
//             latitude: 18.4816,
//             longitude: 73.8188,
//           },
//           place_address: "Sinhagad Road, Pune, Maharashtra 411030, India",
//           place_details:
//             "A calm Japanese-style garden perfect for a relaxing family visit before heading back to Mumbai.",
//           place_image_url:
//             "https://example.com/images/okayama-friendship-garden.jpg",
//           place_name: "Pune Okayama Friendship Garden",
//           ticket_pricing: "INR 5 - 20 per person",
//           time_travel_each_location: "Approx. 20-25 minutes from Parvati Hill",
//         },
//       ],
//       best_time_to_visit_day:
//         "Morning till early afternoon for markets and relaxing spots before departure.",
//       day: 2,
//       day_plan:
//         "Leisurely cultural morning with shopping, scenic stop, and return to Mumbai.",
//     },
//   ],
//   origin: "Mumbai",
// };

function Itinerary() {
  const { tripDetailInfo } = useTripDetail() || {};
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo);
  }, [tripDetailInfo]);

  const data = tripData
    ? [
        {
          title: "Recommended Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripData?.hotels.map((hotel, index) => (
                <HotelCardItem key={index} hotel={hotel} />
              ))}
            </div>
          ),
        },

        ...tripData?.itinerary.map((dayData) => ({
          title: `Day ${dayData?.day}`,
          content: (
            <div>
              <p className="mb-2 font-bold text-xl text-primary">
                Best Time :{dayData?.best_time_to_visit_day}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dayData?.activities?.map((activity, index) => (
                  <PlaceCardItem key={index} activity={activity} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];
  return (
    <div className="relative w-full h-[83vh] overflow-auto ">
      {/* @ts-ignore */}
      {tripData && <Timeline data={data} tripData={tripData} />}
    </div>
  );
}
export default Itinerary;
